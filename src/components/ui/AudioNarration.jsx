import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
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

// Pre-generated static audio files
const STATIC_AUDIO = {
  'building-lightnote': '/audio/building-lightnote.mp3',
  'building-pendulum': '/audio/building-pendulum.mp3',
  'the-science-behind-amble': '/audio/the-science-behind-amble.mp3',
  'designing-behaviour': '/audio/designing-behaviour.mp3',
  'building-amble': '/audio/building-amble.mp3',
  'on-building-a-low-latency-voice-agent': '/audio/on-building-a-low-latency-voice-agent.mp3',
  'benchmarking-ambles-ears': '/audio/benchmarking-ambles-ears.mp3',
  'what-language-learners-taught-us-about-voice-ai': '/audio/what-language-learners-taught-us-about-voice-ai.mp3',
  'bridging-design-and-code': '/audio/bridging-design-and-code.mp3',
};

const SPEED_OPTIONS = [1, 1.2, 1.5, 2];

const AudioNarration = ({ content, slug, wordTimestamps, onWordChange }) => {
  const [status, setStatus] = useState('idle'); // idle | loading | playing | paused
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef(null);

  const { text, estimatedDuration } = useMemo(() => {
    const dast = content?.value?.document || content?.value;
    if (!dast) return { text: '', estimatedDuration: 0 };
    const t = extractText(dast).trim();
    return { text: t, estimatedDuration: estimateDuration(t) };
  }, [content]);

  const staticPath = slug && STATIC_AUDIO[slug];

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Resume from pause
    if (status === 'paused') {
      audio.playbackRate = speed;
      audio.play();
      setStatus('playing');
      return;
    }

    if (staticPath) {
      // Set src and play synchronously in tap handler for iOS
      audio.src = staticPath;
      audio.load();
      audio.playbackRate = speed;
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch((err) => {
          console.error('Play error:', err);
          setStatus('idle');
        });
      }
      setStatus('playing');
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
      .then((res) => {
        if (!res.ok) throw new Error('TTS failed');
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        audio.src = url;
        audio.load();
        audio.playbackRate = speed;
        return audio.play();
      })
      .then(() => {
        setStatus('playing');
      })
      .catch((err) => {
        console.error('Narration error:', err);
        setStatus('idle');
      });
  };

  const handleSpeed = () => {
    const idx = SPEED_OPTIONS.indexOf(speed);
    const next = SPEED_OPTIONS[(idx + 1) % SPEED_OPTIONS.length];
    setSpeed(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = next;
    }
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setStatus('paused');
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);

      // Find current word: binary search for the last word whose start ≤ t,
      // then hold it until the next word begins (so even short words get highlighted)
      if (wordTimestamps && onWordChange) {
        const t = audio.currentTime;
        let lo = 0;
        let hi = wordTimestamps.length - 1;
        let idx = -1;

        // Find rightmost word where start ≤ t
        while (lo <= hi) {
          const mid = (lo + hi) >>> 1;
          if (wordTimestamps[mid].start <= t) {
            idx = mid;
            lo = mid + 1;
          } else {
            hi = mid - 1;
          }
        }

        // Only highlight if we haven't passed well beyond this word's end
        // (handles silence gaps between paragraphs)
        if (idx >= 0) {
          const word = wordTimestamps[idx];
          const nextStart = idx + 1 < wordTimestamps.length
            ? wordTimestamps[idx + 1].start
            : word.end;
          // If we're past the next word's start, show next word;
          // if we're in a long gap after this word ended, clear highlight
          if (t > nextStart) {
            idx = idx + 1 < wordTimestamps.length ? idx + 1 : -1;
          } else if (t > word.end + 0.5) {
            idx = -1; // silence gap > 500ms, clear highlight
          }
        }

        onWordChange(idx);
      }
    }
  };

  const handleEnded = () => {
    setStatus('idle');
    setProgress(0);
    setCurrentTime(0);
    if (onWordChange) onWordChange(-1);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  if (!content?.value || !text) return null;

  const displayDuration = duration > 0 ? formatTime(duration) : formatTime(estimatedDuration);

  return createPortal(
    <div className="audio-narration">
      <audio
        ref={audioRef}
        preload="none"
        playsInline
        webkit-playsinline=""
        onTimeUpdate={handleTimeUpdate}
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
          Loading
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

          <button className="audio-narration__speed" onClick={handleSpeed}>
            {speed}x
          </button>
        </div>
      )}
    </div>,
    document.body
  );
};

export default AudioNarration;
