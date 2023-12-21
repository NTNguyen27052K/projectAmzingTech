import axios from "axios";

export const companySer = {
  getAllCompany: () => {
    return axios.get("http://localhost:1000/company");
  },
  // getEmployeeByCompanyId: (id) => {
  //   return axios.get(`http://localhost:1000/companyCustom/${id}`);
  // },
};
