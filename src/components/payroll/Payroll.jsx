import React, { useContext, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../pages/loading/Loading";
import { getAllSalariesTable } from "../../redux/slices/salariesSli";
import { CompanyContext } from "../../template/HomeTemplate";

const Payroll = () => {
  const companyId = useContext(CompanyContext);
  const { salaries, isLoading } = useSelector((state) => state.salariesTable);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSalariesTable(companyId));
  }, [companyId]);
  const columns = [
    {
      title: "Id",
      dataIndex: "salary_id",
      key: "salary_id",
      align: "center",
    },
    {
      title: "Họ và Tên",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
    },
    {
      title: "Lương cơ bản",
      dataIndex: "base_salary",
      key: "base_salary",
      align: "center",
      render: (text) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </span>
      ),
    },
    {
      title: "Trợ cấp",
      dataIndex: "subsidies_salary",
      key: "subsidies_salary",
      align: "center",
      render: (text) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </span>
      ),
    },
    {
      title: "Số ngày LV",
      dataIndex: "working_days",
      key: "working_days",
      align: "center",
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
      align: "center",
      render: (text) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",

      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <div className="flex justify-between">
            <Button
              type="primary"
              className="bg-blue-600 mr-1"
              // onClick={() =>
              //   employeeSer
              //     .editEmployee(text.user_id, {
              //       ...record,
              //       user_deleted: !text.user_deleted,
              //     })
              //     .then((result) => {
              //       dispatch(getEmployeeByCompanyId(companyId));
              //     })
              //     .catch((error) => {
              //       message.error(error.response.data.message);
              //     })
              // }
            >
              <i className="fa-solid fa-trash"></i>
            </Button>

            <Button
              type="primary"
              className="bg-blue-600"
              // onClick={() => showModal(text.user_id)}
            >
              <i className="fa-solid fa-pen"></i>
            </Button>

            {/* Form */}
          </div>
        </Space>
      ),
    },
  ];
  const salariesTableData = salaries
    ?.filter((salaries) => salaries.salary_deleted === false)
    ?.map((salaries, index) => {
      return {
        key: index,
        salary_id: salaries.user_id,
        user_name: salaries.users.user_name,
        base_salary: salaries.base_salary,
        subsidies_salary: salaries.subsidies_salary,
        working_days: salaries.working_days,
        salary: salaries.salary,
      };
    });
  return (
    <div className="relative">
      {isLoading ? <Loading /> : <></>}
      <Table
        bordered
        size="small"
        columns={columns}
        dataSource={salariesTableData}
        pagination={{
          pageSize: 6,
        }}
      />
    </div>
  );
};

export default Payroll;
