const { StatusCodes } = require('http-status-codes');
const { InventoryService, StorageService } = require('../services');
const { InventoryRepository, ProductRepository, StorageRepository } = require('../repositories');
const logger = require('../utils/logger');
const ApiResponse = require('../dto/response.dto');
const Inventory = require('../models/inventory.model');

const CONTEXT = 'InventoryController';

const inventoryService = new InventoryService(
  new InventoryRepository(),
  new ProductRepository()
);

// ✅ New storageService instance for warehouse update
const storageService = new StorageService(
  new StorageRepository(),
  new ProductRepository()
);

const createInventory = async (req, res) => {
  logger.info(`[${CONTEXT}] Creating new inventory with data: ${JSON.stringify(req.body)}`);

  const inventory = await inventoryService.createInventory(req.body);

  // ✅ Automatically add product to warehouse
  if (inventory && inventory.warehouse) {
    try {
      await storageService.addProductToStorage(inventory.warehouse, inventory._id);
      logger.info(`[${CONTEXT}] Product assigned to warehouse ${inventory.warehouse} successfully`);
    } catch (err) {
      logger.warn(`[${CONTEXT}] Failed to add product to warehouse: ${err.message}`);
    }
  }

  res.status(StatusCodes.CREATED).json(
    ApiResponse.success('Inventory created successfully', { inventory })
  );

  logger.info(`[${CONTEXT}] Inventory created successfully: ${inventory._id}`);
};

const getInventory = async (req, res) => {
  logger.info(`[${CONTEXT}] Fetching inventory with ID: ${req.params.id}`);
  const inventory = await inventoryService.getInventory(req.params.id);
  res.status(StatusCodes.OK).json(
    ApiResponse.success('Inventory fetched successfully', { inventory })
  );
  logger.info(`[${CONTEXT}] Inventory fetched successfully: ${inventory._id}`);
};

const getAllInventories = async (req, res) => {
  logger.info(`[${CONTEXT}] Fetching all inventories`);
  const inventories = await inventoryService.getAllInventories();
  res.status(StatusCodes.OK).json(
    ApiResponse.success('All inventories fetched successfully', {
      length: inventories.length,
      inventories
    })
  );
  logger.info(`[${CONTEXT}] All inventories fetched successfully. Total: ${inventories.length}`);
};

const updateInventory = async (req, res) => {
  logger.info(
    `[${CONTEXT}] Updating inventory ID: ${req.params.id} with data: ${JSON.stringify(req.body)}`
  );
  const updatedInventory = await inventoryService.updateInventory(req.params.id, req.body);
  res.status(StatusCodes.OK).json(
    ApiResponse.success('Inventory updated successfully', {
      inventory: updatedInventory
    })
  );
  logger.info(`[${CONTEXT}] Inventory updated successfully: ${updatedInventory._id}`);
};

const deleteInventory = async (req, res) => {
  logger.info(`[${CONTEXT}] Deleting inventory ID: ${req.params.id}`);
  const deletedInventory = await inventoryService.deleteInventory(req.params.id);
  res.status(StatusCodes.OK).json(
    ApiResponse.success('Inventory deleted successfully', {
      inventory: deletedInventory
    })
  );
  logger.info(`[${CONTEXT}] Inventory deleted successfully: ${deletedInventory._id}`);
};

const addProductToInventory = async (req, res) => {
  logger.info(`[${CONTEXT}] Adding product ${req.body.productId} to inventory ${req.params.id}`);
  const inventory = await inventoryService.addProductToInventory(
    req.params.id,
    req.body.productId
  );
  res.status(StatusCodes.OK).json(
    ApiResponse.success('Product added to inventory successfully', { inventory })
  );
  logger.info(`[${CONTEXT}] Product added to inventory successfully.`);
};

const removeProductFromInventory = async (req, res) => {
  logger.info(`[${CONTEXT}] Removing product ${req.body.productId} from inventory ${req.params.id}`);
  const inventory = await inventoryService.removeProductFromInventory(
    req.params.id,
    req.body.productId
  );
  res.status(StatusCodes.OK).json(
    ApiResponse.success('Product removed from inventory successfully', { inventory })
  );
  logger.info(`[${CONTEXT}] Product removed from inventory successfully.`);
};

const getInventoryCapacityUtilization = async (req, res) => {
  logger.info(`[${CONTEXT}] Getting capacity utilization for inventory ${req.params.id}`);
  const utilization = await inventoryService.getInventoryCapacityUtilization(req.params.id);
  res.status(StatusCodes.OK).json(
    ApiResponse.success('Inventory capacity utilization fetched successfully', { utilization })
  );
  logger.info(`[${CONTEXT}] Inventory capacity utilization fetched successfully.`);
};

const getAllProductsInInventory = async (req, res) => {
  logger.info(`[${CONTEXT}] Getting all products for inventory ${req.params.id}`);
  const products = await inventoryService.getAllProductsInInventory(req.params.id);
  res.status(StatusCodes.OK).json(
    ApiResponse.success('All products in inventory fetched successfully', products)
  );
  logger.info(`[${CONTEXT}] All products from inventory fetched successfully.`);
};

// ✅ Updated direct creation with warehouse included
const createInventoryDirect = async ({ name, quantity, category, supplier, warehouse }) => {
  const newItem = new Inventory({
    name,
    quantity,
    category: category || 'general',
    supplier: supplier || 'N/A',
    warehouse
  });

  const savedItem = await newItem.save();

  // ✅ Auto-update warehouse
  if (savedItem && warehouse) {
    try {
      await storageService.addProductToStorage(warehouse, savedItem._id);
    } catch (err) {
      logger.warn(`[${CONTEXT}] Failed to attach product to warehouse (direct): ${err.message}`);
    }
  }

  return savedItem;
};

module.exports = {
  createInventory,
  getInventory,
  getAllInventories,
  updateInventory,
  deleteInventory,
  addProductToInventory,
  removeProductFromInventory,
  getInventoryCapacityUtilization,
  getAllProductsInInventory,
  createInventoryDirect
};