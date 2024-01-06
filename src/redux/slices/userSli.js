import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { companySer } from "../../services/companySer";
import { userSer } from "../../services/userSer";
import { getDataLocal } from "../../utils/localStore";

export const getAllUser = createAsyncThunk("users/getAllUser", async () => {
  try {
    const res = await userSer.getAllUser();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  // users: [],
  isLoading: false,
  userAccount: getDataLocal("userLocal"),
};

export const userSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {},

  extraReducers: (buider) => {
    buider
      .addCase(getAllUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getAllUser.rejected, (error) => {
        console.log(error);
      });
  },
});

export default userSlice.reducer;
