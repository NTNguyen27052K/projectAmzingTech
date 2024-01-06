import { configureStore } from "@reduxjs/toolkit";
import employeeSli from "./slices/employeeSli";
import leaveApplicationF_Sli from "./slices/leaveApplicationF_Sli";
import companySli from "./slices/companySli";
import userSli from "./slices/userSli";
import salariesSli from "./slices/salariesSli";

export const store = configureStore({
  reducer: {
    employeeList: employeeSli,
    leaveALF: leaveApplicationF_Sli,
    companyList: companySli,
    users: userSli,
    salariesTable: salariesSli,
  },
});
