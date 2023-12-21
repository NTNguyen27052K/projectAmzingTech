import axios from "axios";

export const employeeSer = {
  // getEmployee: () => {
  //   return axios.get("http://localhost:8000/employees");
  // },
  getEmployeeByCompanyId: (id) => {
    return id ? axios.get(`http://localhost:1000/companyCustom/${id}`) : [];
  },
};
