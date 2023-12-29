import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Select } from "antd";
import { NavLink } from "react-router-dom";
import "./addEmploueeM.scss";
const AddEmployeeManager = () => {
  const formik = useFormik({
    initialValues: {
      user_id: null,
      user_name: "",
      email: "",
      phone: "",
      password: "",
      user_deleted: false,
      position_id: null,
      department_id: null,
      roles_name: "user",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(1, "Must be 1 characters or hight")
        .required("Empty"),
      password: Yup.string()
        .min(1, "Must be 1 characters or hight")
        .required("Empty"),
    }),
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;
  return (
    <form onSubmit={handleSubmit} className="mt-5">
      {/* name */}
      <div className="mb-3 ">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Name
        </label>
        <Input
          type="text"
          name="user_name"
          onBlur={handleBlur}
          onChange={handleChange}
          status={touched.user_name && errors.user_name ? "error" : null}
          placeholder="Nhập tên"
          className="py-2"
        />

        {touched.user_name && errors.user_name ? (
          <p className="text-red-500">{errors.user_name}</p>
        ) : null}
      </div>
      {/* Email */}
      <div className="mb-3 ">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <Input
          type="text"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          status={touched.email && errors.email ? "error" : null}
          placeholder="Nhập email"
          className="py-2"
        />

        {touched.email && errors.email ? (
          <p className="text-red-500">{errors.email}</p>
        ) : null}
      </div>
      {/* Mật khẩu */}
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Mật khẩu
        </label>
        <Input
          type="password"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          status={touched.password && errors.password ? "error" : null}
          placeholder="Nhập mật khẩu"
          className="py-2"
        />

        {touched.password && errors.password ? (
          <p className="text-red-500">{errors.password}</p>
        ) : null}
      </div>

      {/* Phone */}
      <div className="mb-3 ">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Phone
        </label>
        <Input
          type="text"
          name="phone"
          onBlur={handleBlur}
          onChange={handleChange}
          status={touched.phone && errors.phone ? "error" : null}
          placeholder="Nhập số điện thoại"
          className="py-2"
        />

        {touched.phone && errors.phone ? (
          <p className="text-red-500">{errors.phone}</p>
        ) : null}
      </div>
      {/* position */}
      <div className="mb-3 flex gap-x-3">
        <div className="select__l basis-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Chức vụ
          </label>
          <select
            name="position_id"
            onChange={handleChange}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-400"
            defaultValue={0}
          >
            <option value={0} selected>
              Chọn chức vụ
            </option>
            <option value={1}>CEO</option>
            <option value={2}>Manager</option>
            <option value={3}>Developer</option>
            <option value={4}>Sales Representative</option>
          </select>
        </div>
        <div className="select__r basis-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Phòng ban
          </label>
          <select
            name="department_id"
            onChange={handleChange}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:outline-blue-400"
            defaultValue={0}
          >
            <option value={0} selected>
              Chọn phòng ban
            </option>
            <option value={1}>Finance</option>
            <option value={2}>Marketing</option>
            <option value={3}>IT</option>
          </select>
        </div>
      </div>
      <div>
        <button
          // onClick={info}
          type="submit"
          className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-3"
        >
          Thêm nhân viên
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeManager;
