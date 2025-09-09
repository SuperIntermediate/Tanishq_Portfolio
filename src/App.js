import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import AdminPanel from './components/AdminPanel';
import CustomCursor from './components/CustomCursor';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="App">
      <CustomCursor />
      <Header showAdmin={showAdmin} setShowAdmin={setShowAdmin} />
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <ScrollToTop />
      <AdminPanel isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </div>
  );
}

export default App;