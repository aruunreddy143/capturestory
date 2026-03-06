import {
  BookOpen,
  Calendar,
  Edit3,
  FileText,
  Mic,
  Share2,
  UserPlus,
  Users,
  Video,
} from 'lucide-react';
import StoryCard from '../../components/StoryCard/StoryCard';
import { currentUser, stories } from '../../data/mockData';
import './Portfolio.css';

export default function Portfolio() {
  const textStories = stories.filter((s) => s.mediaType === 'text');
  const audioStories = stories.filter((s) => s.mediaType === 'audio');
  const videoStories = stories.filter((s) => s.mediaType === 'video');

  return (
    <div className="portfolio-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-header-bg" />
        <div className="profile-header-content">
          <div className="profile-avatar-large">
            <span>{currentUser.avatar}</span>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{currentUser.name}</h2>
            <p className="profile-bio">{currentUser.bio}</p>
            <div className="profile-meta">
              <span className="meta-item">
                <Calendar size={14} />
                Joined{' '}
                {new Date(currentUser.joinedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn btn-primary">
              <Edit3 size={16} />
              Edit Profile
            </button>
            <button className="btn btn-secondary">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats-row">
          <div className="profile-stat">
            <BookOpen size={18} />
            <div>
              <span className="profile-stat-value">{currentUser.storiesCount}</span>
              <span className="profile-stat-label">Stories</span>
            </div>
          </div>
          <div className="profile-stat">
            <Users size={18} />
            <div>
              <span className="profile-stat-value">{currentUser.followers}</span>
              <span className="profile-stat-label">Followers</span>
            </div>
          </div>
          <div className="profile-stat">
            <UserPlus size={18} />
            <div>
              <span className="profile-stat-value">{currentUser.following}</span>
              <span className="profile-stat-label">Following</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="portfolio-content">
        {/* Written Stories */}
        <section className="portfolio-section">
          <div className="portfolio-section-header">
            <FileText size={18} />
            <h3>Written Stories</h3>
            <span className="count-badge">{textStories.length}</span>
          </div>
          <div className="portfolio-stories-grid">
            {textStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="compact" />
            ))}
          </div>
        </section>

        {/* Audio Stories */}
        <section className="portfolio-section">
          <div className="portfolio-section-header">
            <Mic size={18} />
            <h3>Audio Stories</h3>
            <span className="count-badge">{audioStories.length}</span>
          </div>
          <div className="portfolio-stories-grid">
            {audioStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="compact" />
            ))}
          </div>
          {audioStories.length === 0 && (
            <div className="empty-portfolio-section">
              <Mic size={32} />
              <p>No audio stories yet. Record your first one!</p>
            </div>
          )}
        </section>

        {/* Video Stories */}
        <section className="portfolio-section">
          <div className="portfolio-section-header">
            <Video size={18} />
            <h3>Video Stories</h3>
            <span className="count-badge">{videoStories.length}</span>
          </div>
          <div className="portfolio-stories-grid">
            {videoStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="compact" />
            ))}
          </div>
          {videoStories.length === 0 && (
            <div className="empty-portfolio-section">
              <Video size={32} />
              <p>No video stories yet. Start recording!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
