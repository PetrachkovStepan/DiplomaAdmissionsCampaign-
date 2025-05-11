import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
  },
  reducers: {
    getEmployees(state, action) {
      state.employee = action.payload;
    },
    addEmployee(state, action) {
      state.employee.push(action.payload);
    },
    removeEmployee(state, action) {
      action.payload;
      state.employee = state.employee.filter(
        (employee) => employee.id !== action.payload
      );
    },
    changeEmloyee(state, action) {
      for (let index = 0; index < state.employee.length; index++) {
        if (state.employee[index].id == action.payload.id) {
          state.employee[index] = action.payload;
          return;
        }
      }
    },
    blockEmloyee(state, action) {
      for (let index = 0; index < state.employee.length; index++) {
        if (state.employee[index].id == action.payload) {
          state.employee[index].blocked = !state.employee[index].blocked;
          return;
        }
      }
    },
  },
});
export const { getEmployees, addEmployee, removeEmployee, changeEmloyee,blockEmloyee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
