import './Header.css';

export default function Header({ pageTitle }) {
  return (
    <header className="header" style={{
      backgroundColor: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-primary)',
      color: 'var(--text-primary)',
      transition: 'all 0.3s ease'
    }}>
      <div className="header-left">
        <div className="breadcrumb">
          <span className="current-page" style={{ color: 'var(--text-primary)' }}>{pageTitle}</span>
          <span className="separator" style={{ color: 'var(--text-secondary)' }}>•</span>
          <span className="user-name" style={{ color: 'var(--text-secondary)' }}>Carlos Silva</span>
        </div>
      </div>
      
      <div className="header-right">
        <div className="notifications">
          <div className="notification-icon" style={{ color: 'var(--text-secondary)' }}>🔔</div>
          <span className="notification-badge">6</span>
        </div>
        
        <div className="user-profile-header">
          <div className="user-avatar-header" style={{ 
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--bg-primary)'
          }}>CS</div>
        </div>
      </div>
    </header>
  );
}
