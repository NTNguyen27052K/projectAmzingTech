import React from "react";
import { Input, Select, Form } from "antd";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
  labelAlign: "left",
};
const AddEmployeeManager = () => {
  return (
    <Form
      {...layout}
      name="nest-messages"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Họ và tên">
        <Input />
      </Form.Item>
      {/* Số ngày nghỉ */}
      <Form.Item label="Số điện thoại">
        <Input />
      </Form.Item>
      <Form.Item label="Email">
        <Input />
      </Form.Item>
      <Form.Item label="Chức vụ">
        <Select
          defaultValue="Chọn chức vụ"
          options={[
            {
              value: 1,
              label: "Quản lý",
            },
            {
              value: 2,
              label: "Kỹ sư",
            },
            {
              value: 3,
              label: "Kỹ thuật viên vận hành",
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="Phòng ban">
        <Select
          defaultValue="Chọn phòng ban"
          options={[
            {
              value: 1,
              label: "Phòng quản lý",
            },
            {
              value: 2,
              label: "Phòng kỹ thuật",
            },
            {
              value: 3,
              label: "Phòng Quản lý nhân sự",
            },
          ]}
        />
      </Form.Item>
    </Form>
  );
};

export default AddEmployeeManager;
