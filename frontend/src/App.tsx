import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Compare from './pages/Compare';
import Resources from './pages/Resources';
import Settings from './pages/Settings';
import ServiceDetail from './pages/ServiceDetail';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;