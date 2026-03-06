import { Bell, LogOut, Plus, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/stories': 'My Stories',
  '/editor': 'Write a Story',
  '/record': 'Record Story',
  '/portfolio': 'My Portfolio',
  '/settings': 'Settings',
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const title = pageTitles[location.pathname] || 'CaptureStory';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search stories, authors..." className="search-input" />
        </div>
      </div>

      <div className="header-right">
        <button type="button" className="btn-new-story" onClick={() => navigate('/editor')}>
          <Plus size={18} />
          <span>New Story</span>
        </button>

        <button type="button" className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <button type="button" className="icon-btn logout-btn" onClick={handleLogout} title="Sign out">
          <LogOut size={18} />
        </button>

        <div className="header-avatar">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName ?? 'User'} className="header-avatar-img" />
          ) : (
            <span>{user?.displayName?.charAt(0) ?? 'U'}</span>
          )}
        </div>
      </div>
    </header>
  );
}
