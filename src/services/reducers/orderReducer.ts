import {
  SET_ORDER_DETAILS,
  SET_ORDER_DETAILS_SUCCESS,
  SET_ORDER_DETAILS_FAILED,
} from '../constants/index';
import { IOrderDetails } from '../actions/orderActions';
import { TOrderActions } from '../actions/orderActions';

export type TOrderState = {
  orderDetails: IOrderDetails | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: TOrderState = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
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
        orderDetails: action.payload.order
      }
    }
    default: {
      return state;
    }
  }
};