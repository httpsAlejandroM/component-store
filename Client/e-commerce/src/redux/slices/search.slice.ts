import { createSlice } from '@reduxjs/toolkit'
import {type PayloadAction} from '@reduxjs/toolkit'

interface searchString {
    title: string
}

const initialState:searchString  = {title:""}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action:PayloadAction<string>) => {   
        state.title = action.payload     
         return  state
    }
  },
})

export const { setSearchTerm } = searchSlice.actions

export default searchSlice.reducer
