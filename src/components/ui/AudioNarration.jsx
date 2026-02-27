import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
  'a-permanent-platform-for-personal-histories': '/audio/a-permanent-platform-for-personal-histories.mp3',
  'a-present-future-of-creative-software': '/audio/a-present-future-of-creative-software.mp3',
  'earned-simplicity': '/audio/earned-simplicity.mp3',
  'field-notes-in-creative-tooling': '/audio/field-notes-in-creative-tooling.mp3',
  'how-pendulum-searches': '/audio/how-pendulum-searches.mp3',
  'how-we-work': '/audio/how-we-work.mp3',
  'the-fluency-gap': '/audio/the-fluency-gap.mp3',
  'the-science-behind-amble': '/audio/the-science-behind-amble.mp3',
};

// Shared AudioContext (created on first user interaction)
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (iOS suspends by default)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const AudioNarration = ({ content, slug }) => {
  const [status, setStatus] = useState('idle'); // idle | loading | playing | paused
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const sourceRef = useRef(null);
  const bufferRef = useRef(null);
  const startTimeRef = useRef(0);
  const pauseOffsetRef = useRef(0);
  const animFrameRef = useRef(null);

  const { text, estimatedDuration } = useMemo(() => {
    const dast = content?.value?.document || content?.value;
    if (!dast) return { text: '', estimatedDuration: 0 };
    const t = extractText(dast).trim();
    return { text: t, estimatedDuration: estimateDuration(t) };
  }, [content]);

  const staticPath = slug && STATIC_AUDIO[slug];

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch (e) { /* already stopped */ }
      }
    };
  }, []);

  const updateProgress = useCallback(() => {
    if (!bufferRef.current || !audioCtx) return;
    const elapsed = audioCtx.currentTime - startTimeRef.current + pauseOffsetRef.current;
    const dur = bufferRef.current.duration;
    setCurrentTime(Math.min(elapsed, dur));
    setDuration(dur);
    setProgress(dur ? Math.min(elapsed / dur, 1) : 0);
    if (elapsed < dur) {
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const playBuffer = useCallback((buffer, offset = 0) => {
    const ctx = getAudioContext();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.onended = () => {
      // Only reset if it played to the end (not stopped for pause)
      const elapsed = ctx.currentTime - startTimeRef.current + pauseOffsetRef.current;
      if (elapsed >= buffer.duration - 0.1) {
        setStatus('idle');
        setProgress(0);
        setCurrentTime(0);
        pauseOffsetRef.current = 0;
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      }
    };
    sourceRef.current = source;
    startTimeRef.current = ctx.currentTime;
    source.start(0, offset);
    setDuration(buffer.duration);
    setStatus('playing');
    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  const handlePlay = () => {
    // Resume from pause
    if (status === 'paused' && bufferRef.current) {
      playBuffer(bufferRef.current, pauseOffsetRef.current);
      return;
    }

    // Already have decoded buffer, replay from start
    if (bufferRef.current && status === 'idle') {
      pauseOffsetRef.current = 0;
      playBuffer(bufferRef.current, 0);
      return;
    }

    if (!text && !staticPath) return;

    setStatus('loading');

    // Unlock AudioContext on this user gesture
    const ctx = getAudioContext();

    const fetchUrl = staticPath || '/api/narrate';
    const fetchOpts = staticPath
      ? {}
      : {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        };

    fetch(fetchUrl, fetchOpts)
      .then((res) => {
        if (!res.ok) throw new Error('Audio fetch failed');
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((decodedBuffer) => {
        bufferRef.current = decodedBuffer;
        pauseOffsetRef.current = 0;
        playBuffer(decodedBuffer, 0);
      })
      .catch((err) => {
        console.error('Narration error:', err);
        setStatus('idle');
      });
  };

  const handlePause = () => {
    if (sourceRef.current && audioCtx) {
      const elapsed = audioCtx.currentTime - startTimeRef.current + pauseOffsetRef.current;
      pauseOffsetRef.current = elapsed;
      try { sourceRef.current.stop(); } catch (e) { /* ok */ }
      sourceRef.current = null;
      setStatus('paused');
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
  };

  if (!content?.value || !text) return null;

  const displayDuration = duration > 0 ? formatTime(duration) : formatTime(estimatedDuration);

  return createPortal(
    <div className="audio-narration">
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
        </div>
      )}
    </div>,
    document.body
  );
};

export default AudioNarration;
