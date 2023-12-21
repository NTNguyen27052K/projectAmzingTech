import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, AutoComplete } from "antd";
import "./createLAF.scss";
import { useDispatch, useSelector } from "react-redux";
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
  labelAlign: "left",
};

const onFinish = (values) => {
  console.log(values);
};
const CreateLAF = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState("");

  const { employeesL } = useSelector((state) => state.employeeList);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const employeeOptions = employeesL.employees?.map((employee) => ({
    label: employee.employeesName,
    value: employee.id,
  }));
  return (
    <>
      <Button type="primary" className="bg-blue-600 mb-3" onClick={showModal}>
        Tạo đơn
      </Button>
      <Modal
        title="Đơn xin nghỉ phép"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Tạo đơn"}
        okType="default"
        cancelText="Huỷ"
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Họ và tên">
            <AutoComplete
              options={employeeOptions}
              onSelect={(value, option) => {
                console.log(value);
                console.log(option);
              }}
              style={{
                width: 200,
              }}
            />
          </Form.Item>
          {/* Số ngày nghỉ */}
          <Form.Item label="Số ngày nghỉ">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Lý do">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateLAF;
