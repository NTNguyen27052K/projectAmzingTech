import { https } from "./config";

export const salariesSer = {
  getAllTableSalaries: (id) => {
    return https.get(`/salaries/get-all-table-salaries/${id}`);
  },
};
