import React from "react";
import { Collapse } from "antd";

import FormSearch from "./FormSearch";
import EmployeeTable from "./EmployeeTable";

const EmployeeManager = (companyId) => {
  return (
    <div>
      <Collapse
        className="mb-3"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: <FormSearch />,
          },
        ]}
      />
      <EmployeeTable />
    </div>
  );
};

export default EmployeeManager;
