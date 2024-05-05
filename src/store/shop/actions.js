import {
  CREATE_SHOP_START,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_FAILURE,
  UPDATE_SHOP_START,
  UPDATE_SHOP_SUCCESS,
  UPDATE_SHOP_FAILURE,
  DELETE_SHOP_START,
  DELETE_SHOP_SUCCESS,
  DELETE_SHOP_FAILURE,
} from './actionTypes';

export const createShopStart = () => ({
  type: CREATE_SHOP_START,
});

export const createShopSuccess = (shop) => ({
  type: CREATE_SHOP_SUCCESS,
  payload: shop,
});

export const createShopFailure = (err) => ({
  type: CREATE_SHOP_FAILURE,
  payload: err,
});

export const updateShopStart = () => ({
  type: UPDATE_SHOP_START,
});

export const updateShopSuccess = (shop) => ({
  type: UPDATE_SHOP_SUCCESS,
  payload: shop,
});

export const updateShopFailure = (err) => ({
  type: UPDATE_SHOP_FAILURE,
  payload: err,
});

export const deleteShopStart = () => ({
  type: DELETE_SHOP_START,
});

export const deleteShopSuccess = () => ({
  type: DELETE_SHOP_SUCCESS,
});

export const deleteShopFailure = (err) => ({
  type: DELETE_SHOP_FAILURE,
  payload: err,
});
