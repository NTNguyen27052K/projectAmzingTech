import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTemplate from "./template/HomeTemplate";
import EmployeeManager from "./components/employeeManager/EmployeeManager";
import LeaveApplicationForm from "./components/leaveApplicationForm/LeaveApplicationForm.jsx";
import Payroll from "./components/payroll/Payroll.jsx";
import CompanyMgt from "./components/companyMgt/CompanyMgt.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<EmployeeManager />} />
          {/* <Route
            path="/leaveApplicationForm"
            element={<LeaveApplicationForm />}
          /> */}
          <Route path="companyMgt" element={<CompanyMgt />} />
          {/* <Route path="payroll" element={<Payroll />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
