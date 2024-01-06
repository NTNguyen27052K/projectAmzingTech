import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../pages/loading/Loading";
import {
  Space,
  Table,
  Button,
  Collapse,
  Tooltip,
  FloatButton,
  Modal,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddCompany from "./AddCompany";
import CompanyMgtSearch from "./CompanyMgtSearch";

export const CompanySearch = createContext();
const CompanyMgt = () => {
  const { company, isLoading } = useSelector((state) => state.companyList);
  // const [companyData, setCompanyData] = useState();

  useEffect(() => {
    const companyOptions = company.map((comp) => ({
      ...comp,
      key: comp.id,
      value: comp.id,
      label: comp.companyName,
    }));

    // setCompanyData(companyOptions);
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
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Tên công ty",
      dataIndex: "companyName",
      key: "companyName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "companyEmail",
      key: "companyEmail",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "companyPhone",
      key: "companyPhone",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "companyAddress",
      key: "companyAddress",
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [companyNameS, setCompanyNameS] = useState();

  const handleSearch = (value) => {
    setCompanyNameS(value);
  };
  const companyData = company
    ?.filter((company) => company?.company_deleted === false)
    ?.map((company, index) => {
      return {
        key: index,
        id: company.company_id,
        companyName: company.company_name,
        companyAddress: company.company_address,
        companyEmail: company.company_email,
        companyPhone: company.company_phone,
      };
    });
  return (
    <div>
      <Collapse
        className="mb-3"
        items={[
          {
            key: "1",
            label: "Thông tin tìm kiếm",
            children: <CompanyMgtSearch onSearch={handleSearch} />,
          },
        ]}
      />
      <Table
        bordered
        size="small"
        columns={columns}
        dataSource={companyData}
        pagination={{
          pageSize: 4,
        }}
      />
      <Tooltip placement="left" title={"Thêm công ty"}>
        <FloatButton
          onClick={() => showModal()}
          icon={<PlusCircleOutlined />}
        />
      </Tooltip>
      <Modal
        title="Thêm công ty"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Thêm công ty"}
        okType="default"
        cancelText="Huỷ"
      >
        <AddCompany />
      </Modal>
    </div>
  );
};

export default CompanyMgt;
