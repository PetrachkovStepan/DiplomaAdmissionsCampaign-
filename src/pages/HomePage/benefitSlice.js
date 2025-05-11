import { createSlice } from "@reduxjs/toolkit";

const benefitSlice = createSlice({
  name: "benefit",
  initialState: {
    benefit: [],
  },
  reducers: {
    getBenefits(state, action) {
      state.benefit = action.payload;
    },
    addBenefit(state, action) {
      state.benefit.push(action.payload);
    },
    removeBenefit(state, action) {
      action.payload;
      state.benefit = state.benefit.filter(
        (benefit) => benefit.id !== action.payload
      );
    },
  },
});
export const { getBenefits, addBenefit, removeBenefit } =
  benefitSlice.actions;
export default benefitSlice.reducer;
