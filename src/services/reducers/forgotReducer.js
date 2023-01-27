import {
  SET_FORGOT_PASSWORD_VALUE,
  FORGOT_PASS_FORM_SUBMIT,
  FORGOT_PASS_FORM_SUBMIT_SUCCESS,
  FORGOT_PASS_FORM_SUBMIT_FAILED
} from "../actions/forgot";

const initialState = {
  form: {
    email: '',
  },
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
}

export const forgotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORGOT_PASSWORD_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        }
      };
    }
    case FORGOT_PASS_FORM_SUBMIT: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      }
    }
    case FORGOT_PASS_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...state.form
        },
        forgotPasswordFailed: false,
        form: action.payload
      }
    }
    case FORGOT_PASS_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false
      }
    }
    default:
      return state;
  }
};

export default forgotReducer;