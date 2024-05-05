// @flow

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

const INIT_STATE = {
  currentShop: null,
  error: null,
  loading: false,
};

const Shop = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_SHOP_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SHOP_SUCCESS:
      return {
        ...state,
        currentShop: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_SHOP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_SHOP_START:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SHOP_SUCCESS:
      return {
        ...state,
        currentShop: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_SHOP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_SHOP_START:
      return {
        ...state,
        loading: false,
      };
    case DELETE_SHOP_SUCCESS:
      return {
        ...state,
        currentShop: null,
        loading: false,
        error: null,
      };
    case DELETE_SHOP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Shop;
