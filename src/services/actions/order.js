import { sendOrder } from "../../utils/burger-api";

export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const SET_ORDER_DETAILS_FAILED = 'SET_ORDER_DETAILS_FAILED';
export const SET_ORDER_DETAILS_SUCCESS = 'SET_ORDER_DETAILS_SUCCESS';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';

export const setOrderDetails = () => ({ type: SET_ORDER_DETAILS });
export const setOrderDetailsSuccess = (res) => ({ type: SET_ORDER_DETAILS_SUCCESS, payload: res });
export const setOrderDetailsLoadingFailed = () => ({ type: SET_ORDER_DETAILS_FAILED });
export const clearOrderDetails = () => ({ type: CLEAR_ORDER_DETAILS });


export const setOrderData = (dataId) => {
  return function (dispatch) {
    dispatch(setOrderDetails())
    sendOrder(dataId)
      .then(res => {
        if (res) {
          dispatch(setOrderDetailsSuccess(res))
        }
      })
      .then(() => {
        dispatch(clearOrderDetails())
      })
      .catch(() => dispatch(setOrderDetailsLoadingFailed()))
  }
};