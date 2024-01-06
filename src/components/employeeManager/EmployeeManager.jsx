import React, { useContext, useState } from "react";
import {
  Collapse,
  FloatButton,
  Tooltip,
  Modal,
  Button,
  Form,
  Input,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import EmployeeTable from "./EmployeeTable";
import AddEmployeeManager from "./EditInfoEmployee";
import { CompanyContext } from "../../template/HomeTemplate";
import AddEmployee from "./AddEmployee";

const EmployeeManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const companyId = useContext(CompanyContext);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [dataSearch, setDataSearch] = useState({});
  const onFinish = (values) => {
    console.log("result search", values);

    setDataSearch(values);
  };
  const handleOnFieldsChange = (changedFields, allFields) => {
    const output = allFields.reduce((result, item) => {
      result[item.name[0]] = item.value;
      return result;
    }, {});
    setDataSearch(output);
    // console.log(output);
  };
  return (
    <div>
      <Collapse
        className="mb-3"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: (
              <Form
                onFinish={onFinish}
                name="basic"
                className=""
                layout="inline"
                onFieldsChange={handleOnFieldsChange}
              >
                <Form.Item name={"name"} label="Tên" className="mr-3">
                  <Input />
                </Form.Item>
                <Form.Item name={"position"} label="Chức vụ" className="mr-3">
                  <Input />
                </Form.Item>
                <Form.Item name={"phone"} label="SĐT" className="mr-3">
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
      <EmployeeTable
        name={dataSearch.name}
        position={dataSearch.position}
        phone={dataSearch.phone}
      />
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
        <AddEmployee handleCancel={handleCancel} companyId={companyId} />
      </Modal>
    </div>
  );
};

export default EmployeeManager;
