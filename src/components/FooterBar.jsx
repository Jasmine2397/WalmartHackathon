import React from 'react';
import './FooterBar.css';

function FooterBar() {
  return (
    <footer className="footer-bar">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            RetailOptimizer streamlines modern supply chain operations for retail teams through smart AI insights, delivery tracking, inventory control, and workforce management.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/inventory">Inventory</a></li>
            <li><a href="/delivery">Delivery</a></li>
            <li><a href="/admin">Admin Panel</a></li>
            <li><a href="/support">Help & Support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📍 Kanpur, Uttar Pradesh</p>
          <p>📧 support@retailoptimizer.com</p>
          <p>📞 +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 RetailOptimizer Inc. All rights reserved.
      </div>
    </footer>
  );
}

export default FooterBar;