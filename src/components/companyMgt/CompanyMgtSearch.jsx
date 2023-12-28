import React, { useState } from "react";
import { Button, AutoComplete, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
const CompanyMgtSearch = ({ onSearch }) => {
  const { company, isLoading } = useSelector((state) => state.companyList);
  const [optionCopany, setOptionCopany] = useState();
  const [companyAddress, setCompanyAddress] = useState();
  const handleFocus = () => {
    const companyOptions = company.map((comp) => ({
      label: comp.companyName,
      value: comp.companyName,
    }));
    setOptionCopany(companyOptions); // Corrected variable name
  };
  const handleSearch = (value) => {
    onSearch(value);
    // const companyOptions = company
    //   .filter((comp) =>
    //     comp.companyName
    //       .toLowerCase()
    //       .trim()
    //       .includes(value.toLowerCase().trim())
    //   )
    //   .map((comp) => ({
    //     label: comp.companyName,
    //     value: comp.companyName,
    //   }));
    // setOptionCopany(companyOptions);
  };
  return (
    <Form name="basic" className="" layout="inline">
      <Form.Item label="Tên Công ty" className="mr-3">
        <AutoComplete
          options={optionCopany}
          style={{
            width: 200,
          }}
          onFocus={handleFocus}
          //   onSelect={onSelect}
          onSearch={(text) => handleSearch(text)}
        />
      </Form.Item>
      <Form.Item label="Địa chỉ" className="mr-3">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default CompanyMgtSearch;
