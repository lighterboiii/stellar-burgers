import {
  RESET_PASSWORD_FORM_SUBMIT,
  RESET_PASSWORD_FORM_SUBMIT_FAILED,
  RESET_PASSWORD_FORM_SUBMIT_SUCCESS,
  SET_RESET_PASSWORD_FORM_VALUE
} from '../actions/reset';

const initialState = {
  form: {
    password: '',
    token: ''
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false
}

const resetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESET_PASSWORD_FORM_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        }
      };
    }
    case RESET_PASSWORD_FORM_SUBMIT: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      }
    }
    case RESET_PASSWORD_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...state.form
        },
        resetPasswordFailed: false,
        form: action.payload
      }
    }
    case RESET_PASSWORD_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false
      }
    }
    default:
      return state;
  }
};

export { resetReducer };