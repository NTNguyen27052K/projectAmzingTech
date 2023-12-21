import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { companySer } from "../../services/companySer";

export const getAllCompany = createAsyncThunk(
  "company/getAllCompany",
  async () => {
    try {
      const res = await companySer.getAllCompany();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// export const getEmployeeByCompanyId = createAsyncThunk(
//   "employeeByCompanyId/getEmployeeByCompanyId",
//   async (id) => {
//     try {
//       const res = await companySer.getEmployeeByCompanyId(id);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
const initialState = {
  company: [],
  // employeeByCompanyId: [],
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  // pending: Dang chạy
  // fulfilled: Thành công
  // rejected: error
  extraReducers: (buider) => {
    buider
      .addCase(getAllCompany.fulfilled, (state, action) => {
        state.company = action.payload || [];
      })
      .addCase(getAllCompany.rejected, (error) => {
        console.log(error);
      });
    // .addCase(getEmployeeByCompanyId.fulfilled, (state, action) => {
    //   state.employeeByCompanyId = action.payload || [];
    // })
    // .addCase(getEmployeeByCompanyId.rejected, (error) => {
    //   console.log(error);
    // });
  },
});

export default companySlice.reducer;
