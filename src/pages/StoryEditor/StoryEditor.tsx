import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Image,
  Italic,
  Link,
  Save,
  Send,
  Underline,
} from 'lucide-react';
import { useState } from 'react';
import type { StoryCategory } from '../../types';
import './StoryEditor.css';

const categories: StoryCategory[] = [
  'fiction',
  'non-fiction',
  'poetry',
  'memoir',
  'fantasy',
  'mystery',
  'romance',
  'sci-fi',
];

export default function StoryEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<StoryCategory>('fiction');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="editor-page">
      <div className="editor-container">
        {/* Editor Header */}
        <div className="editor-header">
          <div className="editor-meta">
            <div className="category-selector">
              <button
                className="category-trigger"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <span className="category-dot" />
                {category}
                <ChevronDown size={14} />
              </button>
              {showCategoryDropdown && (
                <div className="category-dropdown">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`category-option ${cat === category ? 'category-option--active' : ''}`}
                      onClick={() => {
                        setCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="editor-stats">
              {wordCount} words · {charCount} characters
            </span>
          </div>

          <div className="editor-actions">
            <button className="btn btn-ghost">
              <Save size={16} />
              Save Draft
            </button>
            <button className="btn btn-publish">
              <Send size={16} />
              Publish
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="editor-toolbar">
          <div className="toolbar-group">
            <button className="toolbar-btn">
              <Bold size={16} />
            </button>
            <button className="toolbar-btn">
              <Italic size={16} />
            </button>
            <button className="toolbar-btn">
              <Underline size={16} />
            </button>
          </div>
          <div className="toolbar-divider" />
          <div className="toolbar-group">
            <button className="toolbar-btn">
              <AlignLeft size={16} />
            </button>
            <button className="toolbar-btn">
              <AlignCenter size={16} />
            </button>
            <button className="toolbar-btn">
              <AlignRight size={16} />
            </button>
          </div>
          <div className="toolbar-divider" />
          <div className="toolbar-group">
            <button className="toolbar-btn">
              <Image size={16} />
            </button>
            <button className="toolbar-btn">
              <Link size={16} />
            </button>
          </div>
        </div>

        {/* Writing Area */}
        <div className="writing-area">
          <input
            type="text"
            className="title-input"
            placeholder="Give your story a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="content-input"
            placeholder="Start writing your story here... Let your imagination flow freely."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      {/* Side Panel */}
      <div className="editor-side-panel">
        <div className="panel-section">
          <h4 className="panel-title">Story Cover</h4>
          <div className="cover-preview">
            <div className="cover-placeholder">
              <Image size={24} />
              <span>Add Cover Image</span>
            </div>
          </div>
        </div>

        <div className="panel-section">
          <h4 className="panel-title">Writing Tips</h4>
          <div className="tips-card">
            <p className="tip">
              💡 Start with a hook — the first sentence should grab the reader's attention.
            </p>
          </div>
          <div className="tips-card">
            <p className="tip">
              🎭 Show, don't tell — let readers experience the story through actions and senses.
            </p>
          </div>
          <div className="tips-card">
            <p className="tip">
              ✨ Read it aloud — if it sounds natural when spoken, it will read well too.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
