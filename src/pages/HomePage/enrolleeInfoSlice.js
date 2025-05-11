import { createSlice } from "@reduxjs/toolkit";

const enrolleeInfoSlice = createSlice({
  name: "enrolleeInfo",
  initialState: {
    enrolleeInfo: { passport: {}, education: {} },
  },
  reducers: {
    getEnrolleeInfo(state, action) {
      state.enrolleeInfo = action.payload;
    },
    changeEnrolleeInfo(state, action) {
      state.enrolleeInfo = action.payload;
    },
  },
});
export const { getEnrolleeInfo, changeEnrolleeInfo} =
  enrolleeInfoSlice.actions;
export default enrolleeInfoSlice.reducer;
