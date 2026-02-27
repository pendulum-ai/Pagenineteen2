import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './AudioNarration.css';

// Extract plain text from DatoCMS DAST structured text
function extractText(node) {
  if (!node) return '';
  if (node.type === 'span') return node.value || '';
  if (node.type === 'heading') {
    const text = (node.children || []).map(extractText).join('');
    return text + '.\n\n';
  }
  if (node.type === 'paragraph') {
    const text = (node.children || []).map(extractText).join('');
    return text + '\n\n';
  }
  if (node.type === 'listItem' || node.type === 'list') {
    return (node.children || []).map(extractText).join('');
  }
  if (node.children) {
    return node.children.map(extractText).join('');
  }
  return '';
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Estimate TTS duration from word count (~150 words/min for ElevenLabs)
function estimateDuration(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.round((words / 150) * 60);
}

const PlayIcon = () => (
  <svg className="audio-narration__icon" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 0.5L9 5L2 9.5V0.5Z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg className="audio-narration__icon" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <rect x="1.5" y="0.5" width="2.5" height="9" fill="currentColor" />
    <rect x="6" y="0.5" width="2.5" height="9" fill="currentColor" />
  </svg>
);

// Map of article slugs that have pre-generated audio files in /public/audio/
const STATIC_AUDIO = {
  'a-permanent-platform-for-personal-histories': '/audio/a-permanent-platform-for-personal-histories.mp3',
  'a-present-future-of-creative-software': '/audio/a-present-future-of-creative-software.mp3',
  'earned-simplicity': '/audio/earned-simplicity.mp3',
  'field-notes-in-creative-tooling': '/audio/field-notes-in-creative-tooling.mp3',
  'how-pendulum-searches': '/audio/how-pendulum-searches.mp3',
  'how-we-work': '/audio/how-we-work.mp3',
  'the-fluency-gap': '/audio/the-fluency-gap.mp3',
  'the-science-behind-amble': '/audio/the-science-behind-amble.mp3',
};

const AudioNarration = ({ content, slug }) => {
  const [status, setStatus] = useState('idle'); // idle | loading | playing | paused
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const animFrameRef = useRef(null);

  // Extract text and estimate duration
  const { text, estimatedDuration } = useMemo(() => {
    const dast = content?.value?.document || content?.value;
    if (!dast) return { text: '', estimatedDuration: 0 };
    const t = extractText(dast).trim();
    return { text: t, estimatedDuration: estimateDuration(t) };
  }, [content]);

  const staticPath = slug && STATIC_AUDIO[slug];

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Resume from pause
    if (status === 'paused') {
      audio.play();
      setStatus('playing');
      animFrameRef.current = requestAnimationFrame(updateProgress);
      return;
    }

    if (staticPath) {
      // Static file: set src on tap and play immediately
      audio.src = staticPath;
      audio.load();
      audio.play().catch((err) => {
        console.error('Narration error:', err);
        setStatus('idle');
      });
      setStatus('playing');
      animFrameRef.current = requestAnimationFrame(updateProgress);
      return;
    }

    // Dynamic: fetch from API
    if (!text) return;
    setStatus('loading');
    fetch('/api/narrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('TTS failed');
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        audio.src = url;
        return audio.play();
      })
      .then(() => {
        setStatus('playing');
        animFrameRef.current = requestAnimationFrame(updateProgress);
      })
      .catch((err) => {
        console.error('Narration error:', err);
        setStatus('idle');
      });
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setStatus('paused');
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
  };

  const handleEnded = () => {
    setStatus('idle');
    setProgress(0);
    setCurrentTime(0);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  if (!content?.value || !text) return null;

  // Show actual duration once loaded, otherwise estimate
  const displayDuration = duration > 0 ? formatTime(duration) : formatTime(estimatedDuration);

  return (
    <div className="audio-narration">
      {/* Real DOM audio element for iOS Safari compatibility */}
      <audio
        ref={audioRef}
        preload="none"
        playsInline
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {status === 'idle' && (
        <button className="audio-narration__btn" onClick={handlePlay}>
          <PlayIcon />
          Listen · {displayDuration}
        </button>
      )}

      {status === 'loading' && (
        <span className="audio-narration__btn audio-narration__btn--loading">
          <span className="audio-narration__dots">
            <span className="audio-narration__dot" />
            <span className="audio-narration__dot" />
            <span className="audio-narration__dot" />
          </span>
          Generating
        </span>
      )}

      {(status === 'playing' || status === 'paused') && (
        <div className="audio-narration__player">
          <button
            className="audio-narration__btn"
            onClick={status === 'playing' ? handlePause : handlePlay}
          >
            {status === 'playing' ? <PauseIcon /> : <PlayIcon />}
            {status === 'playing' ? 'Pause' : 'Play'}
          </button>

          <div className="audio-narration__progress-wrap">
            <div
              className="audio-narration__progress-bar"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <span className="audio-narration__time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      )}
    </div>
  );
};

export default AudioNarration;
