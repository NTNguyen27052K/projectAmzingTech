import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { employeeSer } from "../../services/employeeSer";

export const getEmployeeByCompanyId = createAsyncThunk(
  "employees/getEmployeeByCompanyId",
  async (id) => {
    try {
      if (id == 0) {
        const res = await employeeSer.getAllUser();
        console.log("test");
        return res.data;
      } else {
        const res = await employeeSer.getEmployeeByCompanyId(id);

        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllUser = createAsyncThunk("users/getAllUser", async () => {
  try {
  } catch (error) {
    console.log(error);
  }
});
const initialState = {
  employeesL: [],
  isLoading: false,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  // pending: Dang chạy
  // fulfilled: Thành công
  // rejected: error
  extraReducers: (buider) => {
    buider
      .addCase(getEmployeeByCompanyId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeByCompanyId.fulfilled, (state, action) => {
        state.employeesL = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getEmployeeByCompanyId.rejected, (error) => {
        console.log(error);
      });
  },
});

export default employeeSlice.reducer;
