import React, { useState, useRef, useEffect, useCallback } from 'react';
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

const AudioNarration = ({ content }) => {
  const [status, setStatus] = useState('idle'); // idle | loading | playing | paused
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const animFrameRef = useRef(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
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

  const handlePlay = async () => {
    // If we already have audio loaded, just resume
    if (audioRef.current && status === 'paused') {
      audioRef.current.play();
      setStatus('playing');
      animFrameRef.current = requestAnimationFrame(updateProgress);
      return;
    }

    // Extract text from DAST content
    const dast = content?.value?.document || content?.value;
    if (!dast) return;
    const text = extractText(dast).trim();
    if (!text) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/narrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('TTS failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener('ended', () => {
        setStatus('idle');
        setProgress(0);
        setCurrentTime(0);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      });

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });

      await audio.play();
      setStatus('playing');
      animFrameRef.current = requestAnimationFrame(updateProgress);
    } catch (err) {
      console.error('Narration error:', err);
      setStatus('idle');
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setStatus('paused');
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
  };

  if (!content?.value) return null;

  return (
    <div className={`audio-narration ${status !== 'idle' ? 'audio-narration--active' : ''}`}>
      {status === 'idle' && (
        <button className="audio-narration__btn" onClick={handlePlay}>
          <svg className="audio-narration__icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 1L10.5 6L2.5 11V1Z" fill="currentColor" />
          </svg>
          Listen
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
            {status === 'playing' ? (
              <svg className="audio-narration__icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="2" y="1" width="3" height="10" fill="currentColor" />
                <rect x="7" y="1" width="3" height="10" fill="currentColor" />
              </svg>
            ) : (
              <svg className="audio-narration__icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 1L10.5 6L2.5 11V1Z" fill="currentColor" />
              </svg>
            )}
            {status === 'playing' ? 'Pause' : 'Play'}
          </button>

          <div className="audio-narration__progress-wrap">
            <div
              className="audio-narration__progress-bar"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <span className="audio-narration__time">
            {formatTime(currentTime)}
            {duration > 0 && ` / ${formatTime(duration)}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default AudioNarration;
