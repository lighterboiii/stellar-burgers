import {
  OPEN_ORDER_DETAILS_MODAL,
  OPEN_INGREDIENTS_MODAL,
  OPEN_BURGER_DETAILS_MODAL
} from '../constants/index';
import { TModalActions } from '../actions/modalActions';

export type TModalState = {
  isOrderDetailsModalOpen: boolean;
  isIngredientModalOpen: boolean;
  isBurgerDetailsModalOpen: boolean;
};

const initialState: TModalState = {
  isOrderDetailsModalOpen: false,
  isIngredientModalOpen: false,
  isBurgerDetailsModalOpen: false
};

export const modalReducer = (state = initialState, action: TModalActions) => {
  switch (action.type) {
    case OPEN_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        isOrderDetailsModalOpen: action.payload,
      };
    }
    case OPEN_INGREDIENTS_MODAL: {
      return {
        ...state,
        isIngredientModalOpen: action.payload
      };
    }
    case OPEN_BURGER_DETAILS_MODAL: {
      return {
        ...state,
        isBurgerDetailsModalOpen: action.payload
      };
    }
    default: {
      return state;
    }
  }
};