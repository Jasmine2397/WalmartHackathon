const RoleConfig = {
  admin: {
    homepageSections: [
      'summaryTiles',
      'aiInsights',
      'activityFeed',
      'charts',
      'walmartHighlights',
      'profileCard'
    ],
    pages: [
      'inventory',
      'delivery',
      'wage',
      'restocking',
      'alerts',
      'transport',
      'admin',
      'support'
    ]
  },

  delivery: {
    homepageSections: [
      'deliveryMap',
      'assignedDeliveries',
      'fatigueAlert',
      'summaryTiles'
    ],
    pages: ['delivery', 'alerts']
  },

  inventory: {
    homepageSections: ['inventorySummary', 'restockAlerts', 'aiInsights'],
    pages: ['inventory', 'restocking', 'alerts']
  },

  supplier: {
    homepageSections: ['supplierDashboard', 'commitments', 'stockForecast'],
    pages: ['inventory', 'restocking']
  }
};

export default RoleConfig;