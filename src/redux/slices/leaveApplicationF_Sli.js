import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { leaveApplicationFormSer } from "../../services/leaveApplicationF_Ser";

export const getLeaveApplicationF = createAsyncThunk(
  "leaveALF/getLeaveApplicationF",
  async (id) => {
    try {
      const res = await leaveApplicationFormSer.getleaveApplicationF(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  listLALF: [],
  isLoading: false,
};

export const leaveApplicationFormSlice = createSlice({
  name: "leaveALF",
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(getLeaveApplicationF.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLeaveApplicationF.fulfilled, (state, action) => {
        state.listLALF = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getLeaveApplicationF.rejected, (error) => {
        console.log(error);
      });
  },
});

export default leaveApplicationFormSlice.reducer;
