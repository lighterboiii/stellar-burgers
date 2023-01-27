import { forgotPasswordRequest } from "../../utils/burger-api";

export const SET_FORGOT_PASSWORD_VALUE = 'SET_FORGOT_PASSWORD_VALUE';
export const FORGOT_PASS_FORM_SUBMIT = 'FORGOT_PASS_FORM_SUBMIT';
export const FORGOT_PASS_FORM_SUBMIT_SUCCESS = 'FORGOT_PASS_FORM_SUBMIT_SUCCESS';
export const FORGOT_PASS_FORM_SUBMIT_FAILED = 'FORGOT_PASS_FORM_SUBMIT_FAILED';

// отслеживаю изменения инпута /forgot-passsword
export const setForgotPasswordValue = (field, value) => ({
  type: SET_FORGOT_PASSWORD_VALUE,
  field, value
}); 
export const forgotPassFormSubmit = () => ({ type: FORGOT_PASS_FORM_SUBMIT });
export const forgotPassFormSubmitSuccess = (res) => ({ type: FORGOT_PASS_FORM_SUBMIT_SUCCESS, payload: res })
export const forgotPassFormSubmitFailed = () => ({ type: FORGOT_PASS_FORM_SUBMIT_FAILED })

export const postForgotPasswordEmail = (email) => {
  return function (dispatch) {
    dispatch(forgotPassFormSubmit());
    forgotPasswordRequest()
    .then((res) => {
      if (res) {
        dispatch(forgotPassFormSubmitSuccess(res))
      }
    })
    .catch(() => dispatch(forgotPassFormSubmitFailed()))
  }
};