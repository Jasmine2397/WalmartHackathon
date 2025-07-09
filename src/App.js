import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import { AppProvider } from './components/AppContext';

// Page Components
import HomePage from './Pages/HomePage';
import InventoryPages from './Pages/InventoryPages';
import DeliveryPage from './Pages/DeliveryPage';
import WagePage from './Pages/WagePage'; // ✅ Enabled WagePage route
import RestockingPage from './Pages/RestockingPage';
import AlertsPage from './Pages/AlertsPage';
import TransportPage from './Pages/TransportPage';
import AdminPanelPage from './Pages/AdminPanelPage';
import HelpPage from './Pages/HelpPage';

// Styles
import './Pages/InventoryPages.css';
import './Pages/HomePage.css';
import './Pages/DeliveryPage.css';
import './Pages/WagePage.css'; // ✅ Enabled WagePage styles
import './App.css';

function AppLayout() {
  const navigate = useNavigate();

  return (
    <>
      {/* Global Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo">🛒 name</div>
          <div className="nav-tiles">
            <div className="nav-tile" onClick={() => navigate('/')}>Dashboard</div>
            <div className="nav-tile" onClick={() => navigate('/inventory')}>Inventory</div>
            <div className="nav-tile" onClick={() => navigate('/delivery')}>Delivery</div>
            <div className="nav-tile" onClick={() => navigate('/wage')}>Wage</div>
            <div className="nav-tile" onClick={() => navigate('/restocking')}>Restocking</div>
            <div className="nav-tile" onClick={() => navigate('/alerts')}>Alerts</div>
            <div className="nav-tile" onClick={() => navigate('/transport')}>Transport</div>
            <div className="nav-tile" onClick={() => navigate('/admin')}>Admin</div>
            <div className="nav-tile" onClick={() => navigate('/support')}>Help</div>
          </div>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPages />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/wage" element={<WagePage />} /> {/* ✅ Live route */}
        <Route path="/restocking" element={<RestockingPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/transport" element={<TransportPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/support" element={<HelpPage />} />
        <Route
          path="*"
          element={<div style={{ padding: '2rem' }}>404 — Page Not Found 🛑</div>}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </Router>
  );
}

export default App;