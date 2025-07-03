import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shortener from './pages/Shortener';
import Features from './pages/Features';
import About from './pages/About';
import Redirect from './pages/Redirect';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shortener" element={<Shortener />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/:shortCode" element={<Redirect />} />
      </Routes>
    </Layout>
  );
}

export default App;