import { Mic, Video, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Story } from '../../types';
import './StoryPlayer.css';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

interface StoryPlayerProps {
  story: Story;
  onClose: () => void;
}

/**
 * Build the streamable URL for a story's media.
 *
 * `story.mediaUrl` is stored as `/uploads/audio/20260307_abc.webm`.
 * We rewrite it to hit the streaming endpoint that supports Range requests:
 *   → `{API_BASE}/media/stream/audio/20260307_abc.webm`
 */
function streamUrl(story: Story): string {
  const mediaUrl = story.mediaUrl ?? '';

  // Already an absolute URL (e.g. https://…) — use as-is
  if (mediaUrl.startsWith('http')) return mediaUrl;

  // Expected format: /uploads/{audio|video}/{filename}
  const match = mediaUrl.match(/\/uploads\/(audio|video)\/(.+)$/);
  if (match) {
    const [, mediaType, filename] = match;
    return `${API_BASE}/media/stream/${mediaType}/${filename}`;
  }

  // Fallback: serve from the static mount
  return `${API_BASE.replace(/\/api\/?$/, '')}${mediaUrl}`;
}

export default function StoryPlayer({ story, onClose }: StoryPlayerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const src = streamUrl(story);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const MediaIcon = story.mediaType === 'video' ? Video : Mic;

  return (
    <div className="story-player-overlay" ref={overlayRef} onClick={handleBackdrop}>
      <div className="story-player-card">
        {/* Header */}
        <div className="story-player-header">
          <div className="story-player-meta">
            <span className="story-player-badge">
              <MediaIcon size={14} />
              {story.mediaType}
            </span>
            <span className="story-player-category">{story.category}</span>
          </div>
          <button className="story-player-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <h2 className="story-player-title">{story.title}</h2>

        {/* Player */}
        <div className="story-player-media">
          {story.mediaType === 'video' ? (
            <video
              src={src}
              controls
              autoPlay
              className="story-player-video"
              controlsList="nodownload"
            />
          ) : (
            <div className="story-player-audio-wrap">
              <div
                className="story-player-audio-art"
                style={{ background: story.coverGradient }}
              >
                <Mic size={48} />
              </div>
              <audio
                src={src}
                controls
                autoPlay
                className="story-player-audio"
                controlsList="nodownload"
              />
            </div>
          )}
        </div>

        {/* Story info */}
        {story.excerpt && <p className="story-player-excerpt">{story.excerpt}</p>}

        <div className="story-player-footer">
          <span className="story-player-author">{story.author.name}</span>
          <span className="story-player-date">
            {new Date(story.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
