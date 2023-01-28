// import { registerUser } from "../../utils/burger-api";

// export const SET_REGISTER_FORM_VALUE = 'SET_REGISTER_FORM_VALUE';
// export const REGISTER_FORM_SUBMIT = 'REGISTER_FORM_SUBMIT';
// export const REGISTER_FORM_SUBMIT_SUCCESS = 'REGISTER_FORM_SUBMIT_SUCCESS';
// export const REGISTER_FORM_SUBMIT_FAILED = 'REGISTER_FORM_SUBMIT_FAILED';

// export const setRegisterFormValue = (field, value) => ({
//   type: SET_REGISTER_FORM_VALUE,
//   field, value
// });
// export const registerFormSubmit = () => ({ type: REGISTER_FORM_SUBMIT });
// export const registerFormSubmitSuccess = (res) => ({ type: REGISTER_FORM_SUBMIT_SUCCESS, payload: res });
// export const registerFormSubmitFailed = () => ({ type: REGISTER_FORM_SUBMIT_FAILED });

// export const setUserRequest = (email, name, password) => {
//   return function (dispatch) {
//     dispatch(registerFormSubmit());
//     registerUser(email, password, name)
//     .then((res) => {
//       if (res) {
//         dispatch(registerFormSubmitSuccess(res))
//       }
//     })
//     .catch(() => dispatch(registerFormSubmitFailed()))
//   }
// };