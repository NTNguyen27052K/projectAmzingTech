import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
import { NavLink } from "react-router-dom";

const Payroll = () => {
  const formik = useFormik({
    initialValues: {
      luongCB: "",
      phuCap: 1,
      soNgayLV: "",
      luong: "",
    },
    onSubmit: (values) => {
      let luong = ((values.luongCB * values.phuCap) / 26) * values.soNgayLV;
      // userSer
      //   .signUp(values)
      //   .then((result) => {
      //     setLocal("userLocal", result?.data);
      //     // dispatch(setDataName(result?.data));
      //     // setTimeout(() => {
      //     //   navigate("/project");
      //     // }, [2000]);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      formik.setValues({
        ...values,
        luong: luong.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }), // Đặt giá trị lương vào ô luong và làm tròn đến 2 chữ số thập phân
      });
    },

    // validationSchema: Yup.object({
    //   email: Yup.string()
    //     .min(1, "Must be 1 characters or hight")
    //     .required("Empty"),
    //   password: Yup.string()
    //     .min(1, "Must be 1 characters or hight")
    //     .required("Empty"),
    // }),
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;
  return (
    <form onSubmit={handleSubmit} className="mt-5 w-1/2">
      {/* Lương */}
      <div className="mb-3 ">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Lương cơ bản
        </label>
        <Input
          type="text"
          name="luongCB"
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(e);
          }}
          // status={touched.luongCB && errors.luongCB ? "error" : null}
          placeholder="Nhập lương cơ bản"
          className="py-2"
        />

        {/* {touched.email && errors.email ? (
          <p className="text-red-500">{errors.email}</p>
        ) : null} */}
      </div>
      {/* Lương */}
      <div className="mb-3 ">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Phụ cấp
        </label>
        <Input
          type="text"
          name="phuCap"
          onBlur={handleBlur}
          onChange={handleChange}
          // status={touched.email && errors.email ? "error" : null}
          placeholder="Nhập phụ cấp nếu có"
          className="py-2"
        />

        {/* {touched.email && errors.email ? (
          <p className="text-red-500">{errors.email}</p>
        ) : null} */}
      </div>
      {/* Lương */}
      <div className="mb-3 ">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Số ngày làm việc
        </label>
        <Input
          type="text"
          name="soNgayLV"
          onBlur={handleBlur}
          onChange={handleChange}
          // status={touched.email && errors.email ? "error" : null}
          placeholder="Nhập số ngay làm việc"
          className="py-2"
        />

        {/* {touched.email && errors.email ? (
          <p className="text-red-500">{errors.email}</p>
        ) : null} */}
      </div>
      {/* Lương */}
      <div className="mb-3 ">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Tiền lương
        </label>
        <Input
          type="text"
          name="luong"
          // onBlur={handleBlur}
          // onChange={handleChange}
          // status={touched.email && errors.email ? "error" : null}
          value={formik.values.luong}
          placeholder=""
          className="py-2"
        />

        {/* {touched.email && errors.email ? (
          <p className="text-red-500">{errors.email}</p>
        ) : null} */}
      </div>
      <button
        // onClick={info}
        type="submit"
        className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-3"
      >
        Tính tiền lương
      </button>
    </form>
  );
};

export default Payroll;
