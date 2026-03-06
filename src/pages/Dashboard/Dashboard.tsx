import { ArrowUpRight, BookOpen, Eye, Heart, Mic, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StoryCard from '../../components/StoryCard/StoryCard';
import { dashboardStats, featuredPortfolios, stories } from '../../data/mockData';
import './Dashboard.css';

const statCards = [
  {
    label: 'Total Stories',
    value: dashboardStats.totalStories,
    icon: BookOpen,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    change: '+3 this month',
  },
  {
    label: 'Total Views',
    value: dashboardStats.totalViews.toLocaleString(),
    icon: Eye,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    change: '+18% from last month',
  },
  {
    label: 'Total Likes',
    value: dashboardStats.totalLikes,
    icon: Heart,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    change: '+24% from last month',
  },
  {
    label: 'Recordings',
    value: dashboardStats.totalRecordings,
    icon: Mic,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    change: '+2 this week',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-title">
            Welcome back, <span className="gradient-text">Arun</span> ✨
          </h2>
          <p className="welcome-subtitle">
            Ready to capture your next story? Your audience is waiting.
          </p>
        </div>
        <div className="welcome-actions">
          <button className="btn btn-primary" onClick={() => navigate('/editor')}>
            <BookOpen size={18} />
            Write Story
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/record')}>
            <Mic size={18} />
            Record Story
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="stats-grid">
        {statCards.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon" style={{ background: stat.gradient }}>
                <stat.icon size={20} />
              </div>
              <ArrowUpRight size={16} className="stat-trend" />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-change">
              <TrendingUp size={12} />
              {stat.change}
            </div>
          </div>
        ))}
      </section>

      {/* Recent Stories */}
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">Recent Stories</h3>
          <button className="btn-link" onClick={() => navigate('/stories')}>
            View All
          </button>
        </div>
        <div className="stories-grid">
          {stories.slice(0, 3).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Featured Storytellers */}
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">Featured Storytellers</h3>
          <button className="btn-link">Discover More</button>
        </div>
        <div className="storytellers-grid">
          {featuredPortfolios.map((person) => (
            <div key={person.id} className="storyteller-card">
              <div className="storyteller-avatar">
                <span>{person.avatar}</span>
              </div>
              <div className="storyteller-info">
                <h4 className="storyteller-name">{person.name}</h4>
                <p className="storyteller-bio">{person.bio}</p>
                <div className="storyteller-stats">
                  <span>{person.storiesCount} stories</span>
                  <span className="dot">·</span>
                  <span>{person.followers.toLocaleString()} followers</span>
                </div>
              </div>
              <button className="btn-follow">Follow</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
