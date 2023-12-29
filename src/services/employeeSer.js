import { https } from "./config";

export const employeeSer = {
  // getEmployee: () => {
  //   return axios.get("http://localhost:8000/employees");
  // },
  getEmployeeByCompanyId: (id) => {
    return id ? https.get(`/companies/get-usersByCompanyId/${id}`) : [];
  },
  getAllUser: () => {
    return https.get("/users/get-users");
  },
  deleteEmployee: (id, data) => {
    return https.post(`/users/updateUsers/${id}`, data);
  },
};
