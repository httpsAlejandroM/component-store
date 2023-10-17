import { createSlice } from '@reduxjs/toolkit'
import {type PayloadAction} from '@reduxjs/toolkit'

interface searchString {
    title: string
    category: string
    brand: string
}

const initialState:searchString  = {title:"", category: "", brand: ""}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFetchFilters: (state, action:PayloadAction<searchString>) => {   
        state = action.payload
         return  state
    }
  },
})

export const { setFetchFilters } = searchSlice.actions

export default searchSlice.reducer
