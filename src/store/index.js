import { configureStore } from "@reduxjs/toolkit";
import benefitReducer from "@/pages/HomePage/benefitSlice";
import choiceReducer from "@/pages/ApplicationPage/choiceSlice";
import examReducer from "@/pages/EnrolleeProfilePage/examSlice";
import employeeReducer from "@/pages/EmployeePage/employeeSlice";
import specialityReduser from "@/pages/SpecialityPage/specialitySlice";

import isEditReducer from "./globalSlice/isEditSlice";
import userReducer from "./globalSlice/userSlice";

export default configureStore({
  reducer: {
    employee: employeeReducer,
    speciality: specialityReduser,
    isEdit: isEditReducer,
    benefit: benefitReducer,
    choice: choiceReducer,
    exam: examReducer,
    user: userReducer,
  },
});
