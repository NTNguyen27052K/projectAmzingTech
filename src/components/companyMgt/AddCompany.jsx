import React from "react";
import { Input, Form } from "antd";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
  labelAlign: "left",
};
const AddCompany = () => {
  return (
    <Form
      {...layout}
      name="nest-messages"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Tên công ty">
        <Input />
      </Form.Item>
      <Form.Item label="Địa chỉ">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default AddCompany;
