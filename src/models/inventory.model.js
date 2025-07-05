const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    default: 0
  },

  category: {
    type: String,
    default: 'general'
  },

  supplier: {
    type: String,
    default: 'N/A'
  },

  costPrice: {
    type: Number,
    default: 0
  },

  totalCapacity: {
    type: Number,
    default: 0
  },

  capacityOccupied: {
    type: Number,
    default: 0
  },

  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],

  storage: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Storage',
    default: null
  }],

  inventoryLocation: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, { timestamps: true });

const inventoryModel = mongoose.model('Inventory', inventorySchema);
module.exports = inventoryModel;