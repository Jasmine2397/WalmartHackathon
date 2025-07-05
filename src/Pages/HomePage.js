import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../components/AppContext';
import RoleConfig from '../Config/RoleConfig';
import SummaryGrid from '../components/SummaryGrid';
import DeliveryMap from '../components/DeliveryMap';
import AIInsights from '../components/AIInsights';
import ActivityFeed from '../components/ActivityFeed';
import UserProfile from '../components/UserProfile';
import RetailSpotlight from '../components/RetailSpotlight';
import FooterBar from '../components/FooterBar';

import './HomePage.css';

function HomePage() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const allowedSections = RoleConfig[user.role]?.homepageSections || [];

  return (
    <div className="homepage-container">
      {/* 🔒 Welcome Banner */}
      {user.role === 'delivery' && (
        <section className="role-banner">
          <h3>🚚 Welcome, Delivery Personnel!</h3>
          <p>Your upcoming routes and live metrics are below.</p>
        </section>
      )}

      {user.role === 'admin' && (
        <section className="role-banner admin">
          <h3>🛠 Welcome, Administrator</h3>
          <p>System-level controls and analytics are active.</p>
        </section>
      )}

      {/* 👤 Profile */}
      {allowedSections.includes('profileCard') && <UserProfile />}

      {/* 📊 Metrics */}
      {allowedSections.includes('summaryTiles') && <SummaryGrid />}
      {allowedSections.includes('deliveryMap') && <DeliveryMap />}

      {/* 💡 Insights + Activity Side-by-Side */}
      {(allowedSections.includes('aiInsights') || allowedSections.includes('activityFeed')) && (
        <div className="insights-activity-wrapper">
          {allowedSections.includes('aiInsights') && <AIInsights />}
          {allowedSections.includes('activityFeed') && <ActivityFeed />}
        </div>
      )}

      {/* 🛍 Retail Highlights */}
      {allowedSections.includes('retailSpotlight') && <RetailSpotlight />}

      {/* 🔻 Footer */}
      <FooterBar />
    </div>
  );
}

export default HomePage;