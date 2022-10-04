import { configureStore } from "@reduxjs/toolkit";
import { ListAllUsers } from "./actions";

export const store =configureStore({
    reducer:{
        ListAllUsers
    },
});
