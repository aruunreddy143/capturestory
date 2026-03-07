import { Filter, Grid3X3, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import StoryCard from '../../components/StoryCard/StoryCard';
import { getStories } from '../../services/storyService';
import type { Story, StoryCategory } from '../../types';
import './Stories.css';

const categories: (StoryCategory | 'all')[] = [
  'all',
  'fiction',
  'non-fiction',
  'poetry',
  'memoir',
  'fantasy',
  'mystery',
  'romance',
  'sci-fi',
];

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState<StoryCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStories()
      .then(setStories)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load stories'))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === 'all' ? stories : stories.filter((s) => s.category === activeCategory);

  return (
    <div className="stories-page">
      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="filters-left">
          <Filter size={18} className="filter-icon" />
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`pill ${activeCategory === cat ? 'pill--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'toggle-btn--active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 size={18} />
          </button>
          <button
            className={`toggle-btn ${viewMode === 'list' ? 'toggle-btn--active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Stories */}
      {loading && (
        <div className="empty-state">
          <p>Loading stories...</p>
        </div>
      )}

      {error && (
        <div className="empty-state">
          <p>Error: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className={`stories-list stories-list--${viewMode}`}>
          {filtered.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              variant={viewMode === 'list' ? 'compact' : 'default'}
            />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <p>No stories found in this category.</p>
        </div>
      )}
    </div>
  );
}
