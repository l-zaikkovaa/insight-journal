import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Journal from './pages/Journal';
import Insights from './pages/Insights';
import Home from './pages/Home';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <div>
            <h1 className="title">Insight Journal</h1>
            <p className="small">Reflect • Track • Learn</p>
          </div>
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
