import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeaveApplicationF } from "../../redux/slices/leaveApplicationF_Sli";
import { Table, Space, Button, Tag } from "antd";
import { leaveApplicationFormSer } from "../../services/leaveApplicationF_Ser";
import Loading from "../../pages/loading/Loading";
import CreateLAF from "./CreateLAF";
import { CompanyContext } from "../../template/HomeTemplate";

const LeaveApplicationForm = () => {
  const companyId = useContext(CompanyContext);

  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const { listLALF, isLoading } = useSelector((state) => state.leaveALF);

  useEffect(() => {
    dispatch(getLeaveApplicationF(companyId));
  }, [companyId, refresh]);

  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "employeesName",
      key: "employeesName",
      align: "center",
    },
    {
      title: "Số ngày nghỉ",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Lý do",
      dataIndex: "discription",
      key: "discription",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, index) => (
        <Tag color={text === "Đã xác nhận" ? "green" : "red"} key={index}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Xác nhận",
      key: "action",
      align: "center",
      dataIndex: "status",
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <Button
            type={text === "Đã xác nhận" ? "danger" : "primary"}
            className={
              (text === "Đã xác nhận" ? "bg-red-600" : "bg-blue-600") +
              " w-[90px]"
            }
            onClick={() => {
              leaveApplicationFormSer
                .updateLeaveApplicationF(1, {
                  status: "Đang xác nhận",
                })
                .then(() => {
                  setRefresh((prevRefresh) => !prevRefresh);
                })
                .catch((error) => {
                  console.error("Lỗi khi cập nhật:", error);
                });
            }}
          >
            {text === "Đã xác nhận" ? "Hủy" : "Xác nhận"}
          </Button>
        </Space>
      ),
    },
  ];

  const leaveApplicationFormData = listLALF.leaveApplicationForms?.map(
    (item, index) => {
      return {
        ...item,
        key: index,
        employeesName: item.employee.employeesName,
      };
    }
  );

  return (
    <div className="relative">
      <CreateLAF />
      {isLoading ? <Loading /> : <></>}
      <Table
        bordered
        size="small"
        columns={columns}
        dataSource={leaveApplicationFormData}
        pagination={{
          pageSize: 4,
        }}
      />
    </div>
  );
};

export default LeaveApplicationForm;
