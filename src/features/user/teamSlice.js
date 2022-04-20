import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../../api";

export const fetchImages = createAsyncThunk(
  "team/images",
  async (images, thunkAPI) => {
    const response = await get("/images");
    return response.data;
  }
);
export const fetchUsers = createAsyncThunk(
  "team/users",
  async (images, thunkAPI) => {
    const response = await get("/users");
    return response.data;
  }
);

export const createTeam = createAsyncThunk(
  "team/teams",
  async (data, thunkAPI) => {
    const response = await post("/teams", {
      name: data.name,
      img: data.imgId,
      description: data.description,
    });
    return response.data;
  }
);

export const addTask = createAsyncThunk("team/task", async (data, thunkAPI) => {
  const response = await post("/workList/newTask", {
    task: data.task,
    idList: data.idList,
  });
  return response.data;
});

export const removeTask = createAsyncThunk(
  "team/noTask",
  async (data, thunkAPI) => {
    const response = await post("/workList/deleteTask", {
      task: data.task,
      idList: data.idList,
    });
    return response.data;
  }
);

export const getTeams = createAsyncThunk(
  "getTeam/teams",
  async (data, thunkAPI) => {
    const response = await get("/teams");
    return response.data;
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    loading: false,
    teams: [],
    images: [],
    users: [],
    error: false,
    message: "",
  },

  extraReducers(builder) {
    builder
      .addCase(fetchImages.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
        state.message = "success";
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getTeams.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
        state.message = "success";
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.message = "success";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default teamSlice.reducer;
