import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../../api";

export const logIn = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    const response = await post("/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  }
);
export const signUp = createAsyncThunk(
  "user/signUp",
  async (credentials, thunkAPI) => {
    const response = await post("/auth/signup", {
      name: `${credentials.firstname} ${credentials.lastname}`,
      birthday: credentials.birthday,
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  }
);

export const validateSession = createAsyncThunk(
  "user/validate",
  async (params, thunkAPI) => {
    const response = await get("/auth/validate");
    return response.data;
  }
);

export const logOut = createAsyncThunk(
  "user/logout",
  async (user, thunkAPI) => {
    const response = await post("/auth/logout");
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    logged: false,
    name: "",
    role: "",
    email: "",
    userId: "",
    loading: false,
    error: true,
    message: "",
  },

  extraReducers(builder) {
    builder.addCase(logIn.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.logged = true;
      state.name = action.payload.data.name;
      state.email = action.payload.data.email;
      state.role = action.payload.data.role;
      state.userId = action.payload.data._id;
      state.message =
        action.payload.success === false ? action.payload.message : "success";
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
    builder.addCase(validateSession.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(validateSession.fulfilled, (state, action) => {
      state.logged = true;
      state.loading = false;
      state.error = false;
      state.message = "success";
      state.name = action.payload.user.name.split(" ");
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
      state.userId = action.payload.user.id;
    });
    builder.addCase(validateSession.rejected, (state, action) => {
      state.logged = false;
      state.loading = false;
      state.error = true;
      state.message = "The credentials aren't correct";
    });

    builder.addCase(signUp.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.logged = true;
      state.name = action.payload.data.name.split(" ");
      state.email = action.payload.data.email;
      state.message = "success";
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    });

    builder.addCase(logOut.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(logOut.fulfilled, (state, action) => {
      state.logged = false;
      state.error = false;
      state.loading = false;
    });

    builder.addCase(logOut.rejected, (state, action) => {
      state.error = true;
      state.logged = false;
      state.message = "Error";
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
