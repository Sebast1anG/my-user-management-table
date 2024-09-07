import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../api/usersApi";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  filter: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UsersState = {
  users: [],
  filter: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
  status: "idle",
};

export const getUsers = createAsyncThunk("users/fetchUsers", async () => {
  const data = await fetchUsers();
  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { field, value } = action.payload;
      state.filter = {
        ...state.filter,
        [field]: value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setFilter } = usersSlice.actions;
export default usersSlice.reducer;
