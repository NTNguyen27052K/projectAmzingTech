import React, { useEffect, useState, useContext } from "react";
import { Table, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeByCompanyId } from "../../redux/slices/employeeSli";
import Loading from "../../pages/loading/Loading";
import { CompanyContext } from "../../template/HomeTemplate";

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
            <Button type="primary" className="bg-blue-600 mr-1">
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

  const { companyName, id, employees } = employeesL;

  const employeeData = employees?.map((employee, index) => {
    return {
      ...employee,
      key: employee.id,
      employeesId: employee.id,
      employeesName: employee.employeesName,
      employeePhone: employee.employeePhone,
      employeeEmail: employee.employeeEmail,
      employeePosition: employee.positionId.positionName,
      employeeDepartment: employee.departmentId.departmentName,
    };
  });
  return (
    <div className="relative">
      {console.log(companyId)}
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
