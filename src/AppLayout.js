import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAppContext } from './components/AppContext';
import RoleConfig from './Config/RoleConfig';

// Pages
import HomePage from './Pages/HomePage';
import InventoryPages from './Pages/InventoryPages';
import DeliveryPage from './Pages/DeliveryPage';
import RestockingPage from './Pages/RestockingPage';
import AlertsPage from './Pages/AlertsPage';
import TransportPage from './Pages/TransportPage';
import AdminPanelPage from './Pages/AdminPanelPage';
import HelpPage from './Pages/HelpPage';

function AppLayout() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const allowedPages = RoleConfig[user.role]?.pages || [];

  // Map page keys to components
  const pageMap = {
    home: <HomePage />,
    inventory: <InventoryPages />,
    delivery: <DeliveryPage />,
    restocking: <RestockingPage />,
    alerts: <AlertsPage />,
    transport: <TransportPage />,
    admin: <AdminPanelPage />,
    support: <HelpPage />
  };

  return (
    <>
      {/* 🧠 Role-Based Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo">🛒 name</div>
          <div className="nav-tiles">
            {/* Always show Home */}
            <div className="nav-tile" onClick={() => navigate('/')}>Dashboard</div>

            {/* Show allowed page tiles based on role */}
            {allowedPages.map((page) => (
              page !== 'home' && (
                <div key={page} className="nav-tile" onClick={() => navigate(`/${page}`)}>
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </div>
              )
            ))}
          </div>
        </div>
      </header>

      {/* 🌐 Role-Based Route Rendering */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {allowedPages.map((page) => {
          const Component = pageMap[page];
          return Component ? (
            <Route key={page} path={`/${page}`} element={Component} />
          ) : null;
        })}

        {/* Fallback 404 */}
        <Route path="*" element={<div style={{ padding: '2rem' }}>404 — Page Not Found 🛑</div>} />
      </Routes>
    </>
  );
}

export default AppLayout;