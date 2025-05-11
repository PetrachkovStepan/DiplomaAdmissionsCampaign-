import { createSlice } from "@reduxjs/toolkit";

const choiceSlice = createSlice({
  name: "choice",
  initialState: {
    choice: [],
  },
  reducers: {
    getChoices(state, action) {
      state.choice = action.payload;
    },
    addChoices(state, action) {
      state.choice.push(action.payload);
    },
    removeChoices(state, action) {
      action.payload;
      state.choice = state.choice.filter(
        (choice) => choice.id !== action.payload
      );
    },
    upChoice(state, action) {
      const swappedArray1 = [...state.choice];
      const swappedArray2 = [...state.choice];
      for (let index = 0; index < state.choice.length; index++) {
        if (state.choice[index].id == action.payload) {
          state.choice[index - 1] = swappedArray1[index];
          state.choice[index] = swappedArray2[index - 1];
          return;
        }
      }
    },
    downChoice(state, action)  {
      const swappedArray1 = [...state.choice];
      const swappedArray2 = [...state.choice];
      for (let index = 0; index < state.choice.length; index++) {
        if (state.choice[index].id == action.payload) {
          state.choice[index + 1] = swappedArray1[index];
          state.choice[index] = swappedArray2[index + 1];
          return;
        }
      }
    },
  },
});
export const { getChoices, addChoices, removeChoices, upChoice, downChoice } =
  choiceSlice.actions;
export default choiceSlice.reducer;
