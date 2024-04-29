import React from 'react';
import './App.css';
import Header from './components/Header'; // You don't need the .tsx extension here
import MainPage from './pages/Main'; // Make sure the path is correct
import TopicPage from './pages/TopicPage'; // Import the TopicPage component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/topic/:id" element={<TopicPage />} /> {/* New Route for individual topic pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
