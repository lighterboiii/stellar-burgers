import { resetPasswordRequest } from "../../utils/burger-api";

export const SET_RESET_PASSWORD_FORM_VALUE = 'SET_RESET_PASSWORD_FORM_VALUE';
export const RESET_PASSWORD_FORM_SUBMIT = 'RESET_PASSWORD_FORM_SUBMIT';
export const RESET_PASSWORD_FORM_SUBMIT_SUCCESS = 'RESET_PASSWORD_FORM_SUBMIT_SUCCESS';
export const RESET_PASSWORD_FORM_SUBMIT_FAILED = 'RESET_PASSWORD_FORM_SUBMIT_FAILED';

// отслеживаю изменения инпута /reset-password
export const setResetPasswordForm = (field, value) => ({
  type: SET_RESET_PASSWORD_FORM_VALUE,
  field,
  value,
});
export const resetPassFormSubmit = () => ({ type: RESET_PASSWORD_FORM_SUBMIT });
export const resetPassFormSubmitSuccess = (res) => ({ type: RESET_PASSWORD_FORM_SUBMIT_SUCCESS, payload: res });
export const resetPassFormSubmitFailed = () => ({ type: RESET_PASSWORD_FORM_SUBMIT_FAILED });

export const postResetPasswordRequest = () => {
  return function (dispatch) {
    dispatch(resetPassFormSubmit());
    resetPasswordRequest()
    .then((res) => {
      if (res) {
        dispatch(resetPassFormSubmitSuccess(res))
      }
    })
    .catch(() => dispatch(resetPassFormSubmitFailed()))
  }
};