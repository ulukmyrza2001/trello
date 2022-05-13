import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./isAuthenticatedSlice";
import columnSlice from "./column-slice";

const store = configureStore({
    reducer : {
        auth : authSlice.reducer,
        column : columnSlice.reducer,
    }
})
export default store;