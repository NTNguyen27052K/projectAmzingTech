import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { salariesSer } from "../../services/salariesSer";
import { message } from "antd";

export const getAllSalariesTable = createAsyncThunk(
  "SalariesTable/getAllSalariesTable",
  async (id) => {
    try {
      if (id === null || id === undefined) {
        return [];
      }
      const res = await salariesSer.getAllTableSalaries(id);
      return res.data;
    } catch (error) {
      message.error(error.response.data.message);
    }
  }
);

const initialState = {
  salaries: [],
  isLoading: false,
};

export const salariesSlice = createSlice({
  name: "salariesTable",
  initialState,
  reducers: {},

  extraReducers: (buider) => {
    buider
      .addCase(getAllSalariesTable.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllSalariesTable.fulfilled, (state, action) => {
        state.salaries = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getAllSalariesTable.rejected, (error) => {
        console.log(error);
      });
  },
});

export default salariesSlice.reducer;
