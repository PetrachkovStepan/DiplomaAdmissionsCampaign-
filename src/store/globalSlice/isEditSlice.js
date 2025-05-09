import { createSlice } from "@reduxjs/toolkit";

const isEditSlice = createSlice({
  name: "isEdit",
  initialState: {
    isEdit: false,
    id: "",
  },
  reducers: {
    changeEdit(state, action) {
      state.id = action.payload;
      state.isEdit = !state.isEdit;
    },
  },
});
export const { changeEdit } = isEditSlice.actions;
export default isEditSlice.reducer;
