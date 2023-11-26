import { configureStore } from '@reduxjs/toolkit'
import { componentSlice, searchSlice } from "./slices"
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { componentsApi } from './componentsApi/componentsApi'
import {userSlice} from './slices/user.slice'
import { userApi } from './userApi/userApi'

export const store = configureStore({
  reducer: {
    componentReducer: componentSlice.reducer,
    searchReducer: searchSlice.reducer,
    userReducer: userSlice.reducer,
    [componentsApi.reducerPath]: componentsApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(componentsApi.middleware, userApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch