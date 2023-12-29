import axios from "axios";
import { https } from "./config";

export const leaveApplicationFormSer = {
  getleaveApplicationF: (id) => {
    return id ? https.get(`/leaver-form/getLeaveFormsByCompanyId/${id}`) : [];
  },
  updateLeaveApplicationF: (id, data) => {
    return https.put(`/leaver-form/updateLeaverForm/${id}`, data);
  },
};
