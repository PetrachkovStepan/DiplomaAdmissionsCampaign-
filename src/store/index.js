import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "@/pages/EmployeePage/employeeSlice";
import specialityReduser from "@/pages/SpecialityPage/specialitySlice";
import isEditReducer from "./globalSlice/isEditSlice"

export default configureStore({
  reducer: {
    employee: employeeReducer,
    speciality: specialityReduser,
    isEdit: isEditReducer,
  },
});
