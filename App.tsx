
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Booking from './pages/Booking';
import Privacy from './pages/Privacy';
import { TranslationProvider } from './TranslationContext';

const App: React.FC = () => {
  return (
    <TranslationProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/guia-insider" element={<Guide />} />
              <Route path="/reservar" element={<Booking />} />
              <Route path="/privacidad" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TranslationProvider>
  );
};

export default App;
