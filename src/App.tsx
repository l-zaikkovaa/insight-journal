import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Journal from './pages/Journal';
import Insights from './pages/Insights';
import Home from './pages/Home';
import './App.scss';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className={`app ${theme}`}>
        <div className="container">
          <header className="header">
            <Link to="/">
              <div>
                <h1 className="title">Insight Journal</h1>
                <p className="small">Reflect • Track • Learn</p>
              </div>
            </Link>
            <nav className="app_nav">
              <Link to="/" className="nav_link">
                Home
              </Link>
              <Link to="/journal" className="nav_link">
                Journal
              </Link>
              <Link to="/insights" className="nav_link">
                Insights
              </Link>
            </nav>

            <div className="theme_block">
              <div>{theme === 'light' ? '☀️' : '🌙'}</div>
              <label className="theme_toggle">
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <span className="slider"></span>
              </label>
            </div>
          </header>
        </div>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
