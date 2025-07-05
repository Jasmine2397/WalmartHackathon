const logger = require('../utils/logger');
const { NotFoundError, BadRequestError } = require('../errors/client.error');

const CONTEXT = 'StorageService';

class StorageService {
  constructor(StorageRepository, ProductRepository) {
    this.StorageRepository = StorageRepository;
    this.ProductRepository = ProductRepository;
  }

  async createStorageLocation(storageDetails) {
    logger.info(`[${CONTEXT}] Creating new storage location with details: ${JSON.stringify(storageDetails)}`);
    const { length, width, height } = storageDetails.dimensions;
    storageDetails.Volume = length * width * height;
    const storage = await this.StorageRepository.createStorageLocation(storageDetails);
    logger.info(`[${CONTEXT}] Storage location created successfully: ${storage._id}`);
    return storage;
  }

  async getStorage(identifier) {
    logger.info(`[${CONTEXT}] Fetching storage with identifier: ${JSON.stringify(identifier)}`);
    let storage;
    if (identifier.storageId) {
      storage = await this.StorageRepository.getStorageById(identifier.storageId);
    } else if (identifier.locationId) {
      storage = await this.StorageRepository.getStorageByLocationId(identifier.locationId);
    }

    if (!storage) {
      logger.warn(`[${CONTEXT}] Storage not found with identifier: ${JSON.stringify(identifier)}`);
      throw new NotFoundError('Storage location not found');
    }

    logger.info(`[${CONTEXT}] Fetched storage successfully: ${storage._id}`);
    return storage;
  }

  async getAllStorages() {
    logger.info(`[${CONTEXT}] Fetching all storage locations`);
    const storages = await this.StorageRepository.getAllStorages();
    logger.info(`[${CONTEXT}] Fetched all storage locations successfully. Count: ${storages.length}`);
    return storages;
  }

  async updateStorage(storageId, storageDetails) {
    logger.info(`[${CONTEXT}] Updating storage location: ${storageId}`);
    if (storageDetails.dimensions) {
      const { length, width, height } = storageDetails.dimensions;
      storageDetails.Volume = length * width * height;
    }
    const updatedStorage = await this.StorageRepository.updateStorage(storageId, storageDetails);
    if (!updatedStorage) {
      throw new NotFoundError('Storage location not found');
    }
    logger.info(`[${CONTEXT}] Storage location updated successfully: ${storageId}`);
    return updatedStorage;
  }

  async deleteStorage(storageId) {
    logger.info(`[${CONTEXT}] Deleting storage location: ${storageId}`);
    const storage = await this.StorageRepository.getStorageById(storageId);
    if (!storage) {
      throw new NotFoundError('Storage location not found');
    }
    if (storage.products.length > 0) {
      throw new BadRequestError('Cannot delete storage location with products inside.');
    }
    const deletedStorage = await this.StorageRepository.deleteStorage(storageId);
    logger.info(`[${CONTEXT}] Storage location deleted successfully: ${storageId}`);
    return deletedStorage;
  }

  async addProductToStorage(storageId, productId) {
    logger.info(`[${CONTEXT}] Adding product ${productId} to storage ${storageId}`);
    const product = await this.ProductRepository.getProductById(productId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const storage = await this.StorageRepository.getStorageById(storageId);
    if (!storage) {
      throw new NotFoundError('Storage location not found');
    }

    const productVolume = (product.dimensions.length * product.dimensions.width * product.dimensions.height) || 0;
    const productWeight = product.weight || 0;

    if (storage.capacityOccupied + productWeight > storage.holdingCapacity) {
      throw new BadRequestError('Adding product exceeds storage capacity.');
    }
    if (storage.VolumeOccupied + productVolume > storage.Volume) {
      throw new BadRequestError('Adding product exceeds storage volume.');
    }

    const updatedStorage = await this.StorageRepository.addProductToStorage(storageId, productId);
    await this.StorageRepository.updateStorage(storageId, {
      $inc: {
        capacityOccupied: productWeight,
        VolumeOccupied: productVolume
      }
    });

    logger.info(`[${CONTEXT}] Product ${productId} added to storage ${storageId} successfully`);
    return updatedStorage;
  }

  async removeProductFromStorage(storageId, productId) {
    logger.info(`[${CONTEXT}] Removing product ${productId} from storage ${storageId}`);
    const product = await this.ProductRepository.getProductById(productId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const productVolume = (product.dimensions.length * product.dimensions.width * product.dimensions.height) || 0;
    const productWeight = product.weight || 0;

    const updatedStorage = await this.StorageRepository.removeProductFromStorage(storageId, productId);
    await this.StorageRepository.updateStorage(storageId, {
      $inc: {
        capacityOccupied: -productWeight,
        VolumeOccupied: -productVolume
      }
    });

    logger.info(`[${CONTEXT}] Product ${productId} removed from storage ${storageId} successfully`);
    return updatedStorage;
  }

  async getStorageUtilization(storageId) {
    logger.info(`[${CONTEXT}] Calculating utilization for storage: ${storageId}`);
    const result = await this.StorageRepository.getStorageUtilization(storageId);
    logger.info(`[${CONTEXT}] Capacity utilization for storage ${storageId} is ${result.capacityUtilization}`);
    logger.info(`[${CONTEXT}] Volume utilization for storage ${storageId} is ${result.volumeUtilization}`);
    return result;
  }

  async getWarehouseOverview() {
    logger.info(`[${CONTEXT}] Getting overview for all warehouses`);
    const storages = await this.StorageRepository.getAllStorages();

    const overview = storages.map(storage => ({
      id: storage._id,
      name: storage.name,
      region: storage.region || 'Unknown',
      capacityUsed: storage.capacityOccupied || 0,
      totalCapacity: storage.holdingCapacity || 0,
      incomeEarned: storage.income || 0 // Adjust if income is tracked differently
    }));

    logger.info(`[${CONTEXT}] Overview compiled for ${overview.length} warehouses`);
    return overview;
  }
}

module.exports = StorageService;