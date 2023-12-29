import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeaveApplicationF } from "../../redux/slices/leaveApplicationF_Sli";
import { Table, Space, Button, Tag } from "antd";
import { leaveApplicationFormSer } from "../../services/leaveApplicationF_Ser";
import Loading from "../../pages/loading/Loading";
import CreateLAF from "./CreateLAF";
import { CompanyContext } from "../../template/HomeTemplate";
import { getDataLocal, getUserDataLocal } from "../../utils/localStore";

const LeaveApplicationForm = () => {
  const companyId = useContext(CompanyContext);

  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const { listLALF, isLoading } = useSelector((state) => state.leaveALF);
  const userLocal = getUserDataLocal("userLocal");
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
        <Tag color={text ? "green" : "red"} key={index}>
          {text ? "Đã xác nhận" : "Đang xác nhận"}
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
            disabled={userLocal?.roles_name == "admin" ? false : true}
            onClick={() => {
              console.log(record);
              leaveApplicationFormSer
                .updateLeaveApplicationF(record.Leave_form_id, {
                  Leave_form_deleted: record.Leave_form_deleted,
                  Leave_form_id: Number(record.Leave_form_id),
                  Leave_form_quantity: Number(record.Leave_form_quantity),
                  discription: record.discription,
                  user_id: Number(record.user_id),
                  status: text ? false : true,
                })
                .then(() => {
                  setRefresh((prevRefresh) => !prevRefresh);
                })
                .catch((error) => {
                  console.error("Lỗi khi cập nhật:", error);
                });
            }}
          >
            {record.status ? "Hủy" : "Xác nhận"}
          </Button>
        </Space>
      ),
    },
  ];

  const leaveApplicationFormData = listLALF?.map((item, index) => {
    console.log(item);
    return {
      ...item,
      key: index,
      employeesName: item.users.user_name,
      quantity: item.Leave_form_quantity,
      discription: item.discription,
      status: item.status,
    };
  });

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
