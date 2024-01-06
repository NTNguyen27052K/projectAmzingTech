import React, { useEffect, useState, useContext } from "react";
import { Table, Space, Button, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeByCompanyId } from "../../redux/slices/employeeSli";
import Loading from "../../pages/loading/Loading";
import { CompanyContext } from "../../template/HomeTemplate";
import { employeeSer } from "../../services/employeeSer";
import AddEmployeeManager from "./EditInfoEmployee";
import { NavLink } from "react-router-dom";

const EmployeeTable = ({ name, position, phone }) => {
  const companyId = useContext(CompanyContext);

  const dispatch = useDispatch();

  const { employeesL, isLoading } = useSelector((state) => state.employeeList);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    dispatch(getEmployeeByCompanyId(companyId));
    // console.log(name, position, phone);
  }, [companyId, name, position, phone]);

  // Edit Model
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (userId) => {
    setIsModalOpen(true);
    setUserId(userId);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "employeesId",
      key: "employeesId",
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.employeesId - b.employeesId,
    },
    {
      title: "Họ và Tên",
      dataIndex: "employeesName",
      key: "employeesName",
      align: "center",
      editable: true,
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
                  .editEmployee(text.user_id, {
                    ...record,
                    user_deleted: !text.user_deleted,
                  })
                  .then((result) => {
                    dispatch(getEmployeeByCompanyId(companyId));
                  })
                  .catch((error) => {
                    message.error(error.response.data.message);
                  })
              }
            >
              <i className="fa-solid fa-trash"></i>
            </Button>

            <Button
              type="primary"
              className="bg-blue-600"
              onClick={() => showModal(text.user_id)}
            >
              <i className="fa-solid fa-pen"></i>
            </Button>

            {/* Form */}
          </div>
        </Space>
      ),
    },
  ];

  const { companyName, id, employees } = employeesL;

  const employeeData = employeesL
    ?.filter((employee) => {
      return name
        ? employee.user_name.toLowerCase().trim().includes(name.toLowerCase())
        : position
        ? employee.position.position_name
            .toLowerCase()
            .trim()
            .includes(position.toLowerCase())
        : phone
        ? employee.phone.toLowerCase().trim().includes(phone.toLowerCase())
        : employee.user_deleted === false;
    })
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
      <Modal
        title="Chỉnh sửa thông tin nhân viên"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={false}
      >
        <AddEmployeeManager
          userId={userId}
          handleCancel={handleCancel}
          disabled={true}
        />
      </Modal>
    </div>
  );
};

export default EmployeeTable;
{
}
