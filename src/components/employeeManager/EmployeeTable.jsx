import React, { useEffect, useState, useContext } from "react";
import { Table, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeByCompanyId } from "../../redux/slices/employeeSli";
import Loading from "../../pages/loading/Loading";
import { CompanyContext } from "../../template/HomeTemplate";
import { employeeSer } from "../../services/employeeSer";

const EmployeeTable = () => {
  const companyId = useContext(CompanyContext);

  const dispatch = useDispatch();

  const { employeesL, isLoading } = useSelector((state) => state.employeeList);

  useEffect(() => {
    dispatch(getEmployeeByCompanyId(companyId));
  }, [companyId]);

  const columns = [
    {
      title: "Id",
      dataIndex: "employeesId",
      key: "employeesId",
      align: "center",
    },
    {
      title: "Họ và Tên",
      dataIndex: "employeesName",
      key: "employeesName",
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "employeePhone",
      key: "employeePhone",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "employeeEmail",
      key: "employeeEmail",
      align: "center",
    },
    {
      title: "Chức vụ",
      dataIndex: "employeePosition",
      key: "employeePosition",
      align: "center",
    },
    {
      title: "Phòng ban",
      dataIndex: "employeeDepartment",
      key: "employeeDepartment",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",

      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <div className="flex justify-between">
            <Button
              type="primary"
              className="bg-blue-600 mr-1"
              onClick={() =>
                employeeSer
                  .deleteEmployee(text.user_id, {
                    ...text,
                    user_deleted: !text.user_deleted,
                  })
                  .then(() => {
                    dispatch(getEmployeeByCompanyId(companyId));
                  })
              }
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
            <Button type="primary" className="bg-blue-600">
              <i className="fa-solid fa-pen"></i>
            </Button>
            {/* Form */}
          </div>
        </Space>
      ),
    },
  ];

  // const { companyName, id, employees } = employeesL;

  const employeeData = employeesL
    ?.filter((employee) => employee.user_deleted === false)
    ?.map((employee, index) => {
      return {
        ...employee,
        key: index,
        employeesId: employee.user_id,
        employeesName: employee.user_name,
        employeePhone: employee.phone,
        employeeEmail: employee.email,
        employeePosition: employee.position?.position_name,
        employeeDepartment: employee.departments?.departments_name,
      };
    });
  return (
    <div className="relative">
      {isLoading ? <Loading /> : <></>}
      <Table
        bordered
        size="small"
        columns={columns}
        dataSource={employeeData}
        pagination={{
          pageSize: 4,
        }}
      />
    </div>
  );
};

export default EmployeeTable;
{
}
