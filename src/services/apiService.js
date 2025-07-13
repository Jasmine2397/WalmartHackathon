import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; 

// INVENTORY
export const fetchInventory = () =>
  axios.get(`${BASE_URL}/inventory`);

export const fetchInventoryDeep = () =>
  axios.get(`${BASE_URL}/inventory/deep`);

export const addInventoryItem = (data) =>
  axios.post(`${BASE_URL}/inventory/add`, data);

export const deleteInventoryItem = (id) =>
  axios.delete(`${BASE_URL}/inventory/delete/${id}`);

// TRANSFER
export const transferInventoryItem = (payload) =>
  axios.post(`${BASE_URL}/inventory/transfer`, payload);

// BRANCHES
export const fetchAllBranches = () =>
  axios.get(`${BASE_URL}/branches`);

export const fetchBranchInventory = (branchId) =>
  axios.get(`${BASE_URL}/inventory/branch/${branchId}`);

// USER
export const fetchUserDetails = () =>
  axios.get(`${BASE_URL}/user`);

// STORAGE
export const fetchWarehouseOverview = () =>
  axios.get(`${BASE_URL}/api/v1/storage/overview`);