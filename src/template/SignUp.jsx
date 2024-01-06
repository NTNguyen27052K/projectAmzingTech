import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
import { userSer } from "../services/userSer";
import { setLocal } from "../utils/localStore";

const SignUp = ({ handleCancel }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      userSer
        .signUp(values)
        .then((result) => {
          setLocal("userLocal", result?.data);
          handleCancel();
          window.location.reload();
          // dispatch(setDataName(result?.data));
          // setTimeout(() => {
          //   navigate("/project");
          // }, [2000]);
        })
        .catch((error) => {
          console.log(error);
        });
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Cancel
        </button>
        <button
          // onClick={info}
          type="submit"
          className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-3"
        >
          Login
        </button>
      </div>
      {/* <p className="mb-3">
        Already have an account?
        <br />
        <NavLink to={"/signup"} className="text-blue-500 ">
          Sign Up
        </NavLink>
      </p> */}
    </form>
  );
};

export default SignUp;
