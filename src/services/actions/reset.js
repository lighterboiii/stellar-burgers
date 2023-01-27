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