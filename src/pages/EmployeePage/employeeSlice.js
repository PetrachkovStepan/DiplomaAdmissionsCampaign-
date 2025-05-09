import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
  },
  reducers: {
    addEmployee(state, action) {
      console.log(state);
      console.log(action);

      state.employee.push(action.payload);
    },
    removeEmployee(state, action) {
      state.employee = state.employee.filter(
        (employee) => employee.id !== action.payload.id
      );
    },
    changeEmloyee(state, action) {
      let changedEmployee = state.employee.find(
        (employee) => employee.id === action.payload.id
      );
      changedEmployee = action.payload;
    },
  },
});
export const { addEmployee, removeEmployee, changeEmloyee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
