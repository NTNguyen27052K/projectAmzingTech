import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTemplate from "./template/HomeTemplate";
import EmployeeManager from "./components/employeeManager/EmployeeManager";
import LeaveApplicationForm from "./components/leaveApplicationForm/LeaveApplicationForm.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<EmployeeManager />} />
          <Route
            path="/leaveApplicationForm"
            element={<LeaveApplicationForm />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
