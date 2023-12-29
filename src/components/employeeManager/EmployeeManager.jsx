import React, { useState } from "react";
import { Collapse, FloatButton, Tooltip, Modal } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import FormSearch from "./FormSearch";
import EmployeeTable from "./EmployeeTable";
import AddEmployeeManager from "./AddEmployeeManager";
import { CompanyContext } from "../../template/HomeTemplate";

const EmployeeManager = (companyId) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyNameS, setCompanyNameS] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      <Tooltip placement="left" title={"Thêm nhân sự"}>
        <FloatButton icon={<UserAddOutlined />} onClick={() => showModal()} />
      </Tooltip>
      <Modal
        style={{
          top: 20,
        }}
        title="Thêm nhân viên"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Thêm nhân viên"}
        okType="default"
        footer={false}
        // cancelText="Huỷ"
      >
        <AddEmployeeManager />
      </Modal>
    </div>
  );
};

export default EmployeeManager;
