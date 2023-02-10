// import { createSlice } from "@reduxjs/toolkit";
// import { getIngredients } from "../../utils/api";

// const initialState = {
//   ingredients: [],
//   selectedIngredients: [],
//   currentIngredient: null,
//   status: 'default'
// }

// const ingredientSlice = createSlice({
//   name: 'ingredients',
//   initialState,
//   reducers: {
//     openIngredientInfo(state, action) {
//       state.currentIngredient = [...action.payload]
//     },
//     selectIngredients(state, action) {
//       state.selectedIngredients = [...action.payload]
//     },
//     deleteIngredients(state, action) {
//       state.selectedIngredients = [...action.payload]
//     },
//     selectIngredients(state, action) {
//       state.selectedIngredients = [...action.payload]
//     },
//     sortIngredients(state, action) {
//       state.selectedIngredients = [...action.payload]
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getIngredients.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(getIngredients.fulfilled, (state, action) => {
//         state.status = 'default',
//           state.ingredients = [...action.payload]
//       })
//       .addCase(getIngredients.rejected, (state) => {
//         state.status = 'failed'
//       })
//       .addDefaultCase((state) => {
//         state
//       })
//   },
// })

// export const { openIngredientInfo, selectIngredients, deleteIngredients, sortIngredients } = ingredientSlice.actions;
// export default ingredientSlice.reducer;