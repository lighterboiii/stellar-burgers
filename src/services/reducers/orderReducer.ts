import {
  SET_ORDER_DETAILS,
  SET_ORDER_DETAILS_SUCCESS,
  SET_ORDER_DETAILS_FAILED,
} from '../constants/index';
import { IOrderData, IOrderDetails } from '../actions/order';
import { TOrderActions } from '../actions/order';

export type TOrderState = {
  orderDetails: Array<IOrderDetails>;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: TOrderState = {
  orderDetails: [],
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case SET_ORDER_DETAILS: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    }
    case SET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case SET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderDetails: action.payload
      }
    }
    default: {
      return state;
    }
  }
};