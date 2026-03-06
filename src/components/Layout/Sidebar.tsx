import { BookOpen, Feather, LayoutDashboard, Mic, PenTool, Settings, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/stories', icon: BookOpen, label: 'My Stories' },
  { to: '/editor', icon: PenTool, label: 'Write' },
  { to: '/record', icon: Mic, label: 'Record' },
  { to: '/portfolio', icon: User, label: 'Portfolio' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Feather size={24} />
        </div>
        <span className="brand-text">CaptureStory</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
            end={item.to === '/'}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
