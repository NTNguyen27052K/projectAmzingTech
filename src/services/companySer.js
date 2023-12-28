import { https } from "./config";

export const companySer = {
  getAllCompany: () => {
    return https.get("/companies/get-allCompanies");
  },
  // getEmployeeByCompanyId: (id) => {
  //   return axios.get(`http://localhost:1000/companyCustom/${id}`);
  // },
};
