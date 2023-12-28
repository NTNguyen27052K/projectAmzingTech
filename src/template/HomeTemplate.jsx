import React, { useEffect, useState, createContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme, Select, Modal } from "antd";
import "./homeTemplate.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompany } from "../redux/slices/companySli";
import SignUp from "./SignUp";
import { getDataLocal } from "../utils/localStore";
import { jwtDecode } from "jwt-decode";

const { Header, Sider, Content } = Layout;

export const CompanyContext = createContext();

const HomeTemplate = () => {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [companyId, setCompanyId] = useState();
  const { company } = useSelector((state) => state.companyList);
  if (getDataLocal("userLocal")?.accessToken) {
    var { data } = jwtDecode(getDataLocal("userLocal")?.accessToken);
  }
  useEffect(() => {
    dispatch(getAllCompany());
    // console.log(data);
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const companyLst = company.map((item, index) => {
    // console.log(item);
    return {
      ...item,
      key: index,
      value: item.company_id,
      label: item.company_name,
    };
  });
  companyLst.unshift({
    key: 4,
    value: 0,
    label: "All company",
  });
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

  return (
    <CompanyContext.Provider value={companyId}>
      <Layout className="h-screen ">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          className="mt-[16px] mb-[24px] ml-[16px] rounded-lg  "
        >
          <div className="flex justify-center items-center  flex-col  mb-[24px] h-[64px] ">
            <h1 className=" text-lg font-bold object-center">NTN</h1>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <NavLink to="/">Quản lý nhân viên</NavLink>,
              },
              {
                key: "2",
                icon: <i className="fa-solid fa-user-tie fa-sm"></i>,
                label: (
                  <NavLink to="/leaveApplicationForm">
                    Quản lý nghỉ phép
                  </NavLink>
                ),
              },
              {
                key: "3",
                icon: <i className="fa-regular fa-envelope fa-sm"></i>,
                label: <NavLink to="/companyMgt">Quản lý Công ty</NavLink>,
              },
              {
                key: "4",
                icon: <i className="fa-regular fa-credit-card"></i>,
                label: <NavLink to="/payroll">Tính lương</NavLink>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              margin: "16px 16px 0 16px",
            }}
            className="rounded-lg flex justify-between items-center"
          >
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Select
                style={{ width: 500 }}
                showSearch
                placeholder="Chọn nhà máy"
                optionFilterProp="children"
                size="large"
                options={companyLst}
                onChange={(value) => {
                  // console.log(value);
                  setCompanyId(value);
                }}
              />
            </div>
            <div className="mr-8">
              {data?.user_name ? (
                <p>{data?.user_name}</p>
              ) : (
                <Button type="default flex items-center" onClick={showModal}>
                  <span className="mr-2">Sign Up</span>
                  <i className="fa-solid fa-right-to-bracket"></i>
                </Button>
              )}
              <Modal
                title="Sign Up"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={"Tạo đơn"}
                okType="default"
                cancelText="Huỷ"
                footer={false}
                className=""
              >
                <SignUp />
              </Modal>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </CompanyContext.Provider>
  );
};

export default HomeTemplate;
