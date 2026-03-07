import { Clock, Eye, FileText, Heart, Mic, Video } from 'lucide-react';
import type { Story } from '../../types';
import './StoryCard.css';

interface StoryCardProps {
  story: Story;
  variant?: 'default' | 'compact' | 'featured';
  onClick?: () => void;
}

const mediaIcons = {
  text: FileText,
  audio: Mic,
  video: Video,
};

export default function StoryCard({ story, variant = 'default', onClick }: StoryCardProps) {
  const MediaIcon = mediaIcons[story.mediaType];

  return (
    <article className={`story-card story-card--${variant}`} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      <div className="story-card-cover" style={{ background: story.coverGradient }}>
        <div className="story-card-media-badge">
          <MediaIcon size={14} />
          <span>{story.mediaType}</span>
        </div>
        {story.duration && (
          <div className="story-card-duration">
            <Clock size={12} />
            <span>{story.duration}</span>
          </div>
        )}
        {!story.isPublished && <div className="story-card-draft-badge">Draft</div>}
      </div>

      <div className="story-card-body">
        <span className="story-card-category">{story.category}</span>
        <h3 className="story-card-title">{story.title}</h3>
        <p className="story-card-excerpt">{story.excerpt}</p>

        <div className="story-card-footer">
          <div className="story-card-stats">
            <span className="stat">
              <Heart size={14} />
              {story.likes}
            </span>
            <span className="stat">
              <Eye size={14} />
              {story.views}
            </span>
          </div>
          <span className="story-card-date">
            {new Date(story.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </article>
  );
}
