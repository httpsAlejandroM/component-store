import { configureStore } from '@reduxjs/toolkit'
import { componentSlice } from "./slices"
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { componentsApi } from './componentsApi/componentsApi'

export const store = configureStore({
  reducer: {
    componentReducer: componentSlice.reducer,
    [componentsApi.reducerPath]: componentsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(componentsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch