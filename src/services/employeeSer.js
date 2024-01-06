import { https } from "./config";

export const employeeSer = {
  getEmployeeByCompanyId: (id) => {
    return https.get(`/companies/get-usersByCompanyId/${id}`);
  },
  getAllUser: () => {
    return https.get("/users/get-users");
  },
  editEmployee: (id, data) => {
    try {
      return https.post(`/users/updateUsers/${id}`, data);
    } catch (error) {
      console.log(error);
    }
  },
};
