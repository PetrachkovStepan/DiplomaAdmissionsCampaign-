import { createSlice } from "@reduxjs/toolkit";

const specialitySlice = createSlice({
  name: "speciality",
  initialState: {
    speciality: [],
  },
  reducers: {
    getSpecialities(state, action) {
      state.speciality = action.payload;
    },
    addSpeciality(state, action) {
      state.speciality.push(action.payload);
    },
    removeSpeciality(state, action) {
      action.payload;
      state.speciality = state.speciality.filter(
        (speciality) => speciality.id !== action.payload
      );
    },
    changeSpeciality(state, action) {
      for (let index = 0; index < state.speciality.length; index++) {
        if (state.speciality[index].id == action.payload.id) {
          state.speciality[index] = action.payload;
          return
        }
      }
    },
  },
});
export const {
  getSpecialities,
  addSpeciality,
  removeSpeciality,
  changeSpeciality,
} = specialitySlice.actions;
export default specialitySlice.reducer;
