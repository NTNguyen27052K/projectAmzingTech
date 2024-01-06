import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const FormSearch = ({ sendDataToParent }) => {
  const sendDataToParentOnClick = (data) => {
    sendDataToParent(data);
  };
  const onFinish = (values) => {
    // console.log("Finish:", values);
    sendDataToParentOnClick(values.name);
  };
  return (
    <Form onFinish={onFinish} name="basic" className="" layout="inline">
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
        <Button type="primary" htmlType="submit" className="bg-blue-600">
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
  );
};

export default FormSearch;
