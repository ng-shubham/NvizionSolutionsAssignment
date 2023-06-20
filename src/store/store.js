import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "./roleSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        role: roleSlice,
    }
})

export default store