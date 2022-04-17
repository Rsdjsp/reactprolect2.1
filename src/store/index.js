import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import teamReducer from "../features/user/teamSlice";

const store = configureStore({
  reducer: {
    //TODO:Agregar reducers
    user: userReducer,
    team: teamReducer,
  },
});

export default store;
