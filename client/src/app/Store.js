import {configureStore} from "@reduxjs/toolkit"
import { ApiSlice } from "./api/ApiSlice"
import { setupListeners } from "@reduxjs/toolkit/query"

import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        [ApiSlice.reducerPath]: ApiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)