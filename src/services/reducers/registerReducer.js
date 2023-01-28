// import { 
//   REGISTER_FORM_SUBMIT,
//   REGISTER_FORM_SUBMIT_FAILED,
//   REGISTER_FORM_SUBMIT_SUCCESS,
//   SET_REGISTER_FORM_VALUE
// } from '../actions/register';

// const initialState = {
//   form: {
//     email: '',
//     password: '',
//     name: ''
//   },
//   registerRequest: false,
//   registerFailed: false
// };

// const registerReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_REGISTER_FORM_VALUE: {
//       return {
//         ...state,
//         form: {
//           ...state.form,
//           [action.field]: action.value,
//         }
//       };
//     }
//     case REGISTER_FORM_SUBMIT: {
//       return {
//         ...state,
//         registerRequest: true,
//         registerFailed: false,
//       }
//     }
//     case REGISTER_FORM_SUBMIT_SUCCESS: {
//       return {
//         ...state,
//         form: {
//           ...state.form
//         },
//         registerFailed: false,
//         form: action.payload
//       }
//     }
//     case REGISTER_FORM_SUBMIT_FAILED: {
//       return {
//         ...state,
//         registerFailed: true,
//         registerRequest: false
//       }
//     }
//     default:
//       return state;
//   }
// };

// export { registerReducer };