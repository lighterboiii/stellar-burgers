import { sendOrder } from "../../utils/api";
import { getCookie } from "../../utils/cookie";

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
    console.log(dataId)
    dispatch(setOrderDetails())
    sendOrder(dataId, getCookie("accessToken"))
      .then(res => {
        if (res) {
          dispatch(setOrderDetailsSuccess(res))
        }
      })
      .then(() => {
        dispatch(clearOrderDetails())
      })
      .catch((err) => {
        dispatch(setOrderDetailsLoadingFailed())
        console.log(err)
      })
  }
};