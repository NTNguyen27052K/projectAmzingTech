import axios from "axios";

export const leaveApplicationFormSer = {
  getleaveApplicationF: (id) => {
    return id ? axios.get(`http://localhost:1000/company/${id}/leaveALF`) : [];
  },
  updateLeaveApplicationF: (id, data) => {
    return axios.put(`http://localhost:1000/leaveALF/${id}`, data);
  },
};
