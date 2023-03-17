import { sendOrderRequest } from "../../utils/api";
import { getCookie } from "../../utils/cookie";
import { setRefreshToken } from "./user";
import {
  SET_ORDER_DETAILS,
  SET_ORDER_DETAILS_FAILED,
  SET_ORDER_DETAILS_SUCCESS,
  CLEAR_ORDER_DETAILS
} from '../constants/index';
import { AppDispatch } from "../types";
import { IIngredient } from "./ingredients";

export interface IOrderDetails {
  readonly _id: string;
  readonly ingredients: Array<string>;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string | number | Date;
  readonly updatedAt: string;
  readonly number: number;
}

export interface IOrderData {
  readonly order: IOrderDetails;
  readonly orderDetails: IOrderDetails;
}

export interface ISetOrderDetails {
  readonly type: typeof SET_ORDER_DETAILS;
}

export interface ISetOrderDetailsFailed {
  readonly type: typeof SET_ORDER_DETAILS_FAILED;
}

export interface ISetOrderDetailsSuccess {
  readonly type: typeof SET_ORDER_DETAILS_SUCCESS;
  readonly payload: IOrderDetails;
}

export interface IClearOrderDetails {
  readonly type: typeof CLEAR_ORDER_DETAILS;
}

export type TOrderActions =
  | ISetOrderDetails
  | ISetOrderDetailsSuccess
  | ISetOrderDetailsFailed
  | IClearOrderDetails;

export const setOrderDetails = (): ISetOrderDetails => ({ type: SET_ORDER_DETAILS });
export const setOrderDetailsSuccess = (res: IOrderDetails): ISetOrderDetailsSuccess => ({ type: SET_ORDER_DETAILS_SUCCESS, payload: res });
export const setOrderDetailsLoadingFailed = (): ISetOrderDetailsFailed => ({ type: SET_ORDER_DETAILS_FAILED });
export const clearOrderDetails = (): IClearOrderDetails => ({ type: CLEAR_ORDER_DETAILS });

export const setOrderData = (dataId: Array<IIngredient>) => {
  return function (dispatch: AppDispatch) {
    dispatch(setOrderDetails())
    sendOrderRequest(dataId, getCookie("accessToken"))
      .then(res => {
        if (res) {
          dispatch(setOrderDetailsSuccess(res))
        }
      })
      .then(() => {
        dispatch(clearOrderDetails())
      })
      .catch((err) => {
        // if (err.message === "jwt expired") {
        //   dispatch(setRefreshToken(getCookie("refreshToken")))
        //     .then(() => sendOrderRequest(dataId, getCookie("accessToken")) //TODO: исправить ошибку
        //       .then(res => {
        //         dispatch(setOrderDetailsSuccess(res))
        //       })
        //     )
        // }
        dispatch(setOrderDetailsLoadingFailed())
        console.log(err)
      })
  }
};