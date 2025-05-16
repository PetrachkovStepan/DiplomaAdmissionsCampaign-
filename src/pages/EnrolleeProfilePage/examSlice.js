import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
  name: "exam",
  initialState: {
    exam: [],
  },
  reducers: {
    getExams(state, action) {
      state.exam = action.payload;
    },
    addExams(state, action) {
      state.exam.push(action.payload);
    },
    removeExam(state, action) {
      action.payload;
      state.exam = state.exam.filter(
        (exam) => exam.id !== action.payload
      );
    },
  },
});
export const { getExams, addExams, removeExam } =
  examSlice.actions;
export default examSlice.reducer;
