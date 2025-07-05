const express = require('express');
const inventoryRouter = express.Router();

const adminMiddleware = require('../../middlewares/auth.admin.middleware');
const validator = require('../../validators/zod.validator');
const { inventoryController } = require('../../controllers');
const { inventoryDto } = require('../../dto');
const authMiddleware = require('../../middlewares/auth.middleware');

// 🔓 TEMPORARY: Allow unauthenticated POST from React frontend
inventoryRouter.post('/', async (req, res) => {
  try {
    const { name, quantity, category, supplier } = req.body;

    const newItem = await inventoryController.createInventoryDirect({
      name,
      quantity,
      category: category || 'general',
      supplier: supplier || 'N/A'
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add inventory item',
      error: error.message
    });
  }
});

// ✅ Secure production routes
inventoryRouter.get('/', inventoryController.getAllInventories);
inventoryRouter.get('/:id', inventoryController.getInventory);

inventoryRouter.post(
  '/create',
  adminMiddleware,
  validator(inventoryDto.createInventorySchema),
  inventoryController.createInventory
);

inventoryRouter.put(
  '/:id',
  adminMiddleware,
  validator(inventoryDto.updateInventorySchema),
  inventoryController.updateInventory
);

inventoryRouter.delete('/:id', adminMiddleware, inventoryController.deleteInventory);

inventoryRouter.post('/:id/products', authMiddleware, inventoryController.addProductToInventory);
inventoryRouter.get('/:id/products', inventoryController.getAllProductsInInventory);
inventoryRouter.delete('/:id/products', authMiddleware, inventoryController.removeProductFromInventory);
inventoryRouter.get('/:id/utilization', inventoryController.getInventoryCapacityUtilization);

module.exports = inventoryRouter;