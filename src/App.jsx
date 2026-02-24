import React, { useState, useEffect } from 'react';
import { UserCircle, ShieldCheck, GraduationCap, LayoutDashboard, ClipboardList, BarChart3, LogOut, BookOpen } from 'lucide-react';
import './App.css';

import AdminDashboard from './components/Admin/Dashboard';
import FormBuilder from './components/Admin/FormBuilder';
import StudentFeedback from './components/Student/FeedbackForm';
import StudentResults from './components/Student/ResultsView';
import InstructorDashboard from './components/Instructor/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { seedData } from './utils/seedData';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'register', 'app'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Initialize data and check session
  useEffect(() => {
    // Seed data if first time
    if (!localStorage.getItem('feedbackUsers')) {
      seedData();
    }

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('app');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setView('app');
    setActiveTab('dashboard');
  };

  const handleRegister = (userData) => {
    handleLogin(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setView('login');
  };

  if (view === 'login') {
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />;
  }

  if (view === 'register') {
    return <Register onRegister={handleRegister} onSwitchToLogin={() => setView('login')} />;
  }

  return (
    <div className="app-layout">
      <nav className="glass sidebar">
        <div className="sidebar-header">
          <h2 className="gradient-text">EduFeedback</h2>
        </div>

        <div className="sidebar-links">
          {user.role === 'admin' && (
            <>
              <button
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <LayoutDashboard size={20} /> Dashboard
              </button>
              <button
                className={`nav-link ${activeTab === 'forms' ? 'active' : ''}`}
                onClick={() => setActiveTab('forms')}
              >
                <ClipboardList size={20} /> Form Builder
              </button>
            </>
          )}

          {user.role === 'instructor' && (
            <>
              <button
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <LayoutDashboard size={20} /> Dashboard
              </button>
            </>
          )}

          {user.role === 'student' && (
            <>
              <button
                className={`nav-link ${activeTab === 'feedback' ? 'active' : ''}`}
                onClick={() => setActiveTab('feedback')}
              >
                <ClipboardList size={20} /> My Feedback
              </button>
              <button
                className={`nav-link ${activeTab === 'results' ? 'active' : ''}`}
                onClick={() => setActiveTab('results')}
              >
                <BarChart3 size={20} /> View Results
              </button>
            </>
          )}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <UserCircle size={24} />
            <div className="user-details">
              <span className="user-name">{user.fullName}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <main className="content-area">
        <header className="content-header glass">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}</h1>
          <div className="header-actions">
            <div className="badge">{user.role.toUpperCase()}</div>
          </div>
        </header>

        <section className="main-view animate-fade-in">
          {user.role === 'admin' && (
            activeTab === 'dashboard' ? <AdminDashboard /> : <FormBuilder />
          )}
          {user.role === 'instructor' && (
            <InstructorDashboard user={user} />
          )}
          {user.role === 'student' && (
            activeTab === 'feedback' ? <StudentFeedback /> : <StudentResults />
          )}
        </section>
      </main>

      <style>{`
        .user-details { display: flex; flex-direction: column; }
        .user-name { font-weight: 600; font-size: 0.9rem; }
        .user-role { font-size: 0.75rem; color: var(--text-muted); text-transform: capitalize; }
      `}</style>
    </div>
  );
}

export default App;
