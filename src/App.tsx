import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Journal from './pages/Journal';
import Insights from './pages/Insights';
import Home from './pages/Home';
import './App.scss';

function App() {
  return (
    <Router>
      <header className="app-nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/journal" className="nav-link">
          Journal
        </Link>
        <Link to="/insights" className="nav-link">
          Insights
        </Link>
      </header>

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
