import React from 'react';
import './App.css';
import Header from './components/Header'; // You don't need the .tsx extension here
import MainPage from './pages/Main'; // Make sure the path is correct
import TopicPage from './pages/TopicPage'; // Import the TopicPage component
import NotFoundPage from './pages/NotFoundPage'; // Make sure to import the NotFoundPage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
