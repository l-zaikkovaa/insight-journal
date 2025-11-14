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
          <button onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>
      </div>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
