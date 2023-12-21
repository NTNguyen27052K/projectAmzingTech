import React, { useEffect, useState, createContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme, Select } from "antd";
import "./homeTemplate.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompany } from "../redux/slices/companySli";

const { Header, Sider, Content } = Layout;

export const CompanyContext = createContext();

const HomeTemplate = () => {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [companyId, setCompanyId] = useState();
  const { company } = useSelector((state) => state.companyList);

  useEffect(() => {
    dispatch(getAllCompany());
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const companyLst = company.map((item, index) => {
    // console.log(item);
    return {
      ...item,
      key: index,
      value: item.id,
      label: item.companyName,
    };
  });

  return (
    <CompanyContext.Provider value={companyId}>
      <Layout className="h-screen">
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
                label: "Quản lý công ty",
              },
              {
                key: "3",
                icon: <i className="fa-regular fa-envelope fa-sm"></i>,
                label: (
                  <NavLink to="/leaveApplicationForm">
                    Quản lý nghỉ phép
                  </NavLink>
                ),
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
                  setCompanyId(value);
                }}
              />
            </div>
            <div className="mr-8">
              <i className="fa-solid fa-ellipsis fa-md mr-2"></i>
              <i className="fa-regular fa-user fa-md"></i>
              <span className="ml-2">Admin</span>
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
