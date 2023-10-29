import { createSlice } from '@reduxjs/toolkit'
import {type PayloadAction} from '@reduxjs/toolkit'
import { QueryApi } from '../../interfaces'

const initialState:QueryApi  = {title:"", category: "", brand: "", order:"", page:1, perPage:12}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFetchFilters: (state, action:PayloadAction<QueryApi>) => {   
        state = action.payload
         return  state
    }
  },
})

export const { setFetchFilters } = searchSlice.actions

export default searchSlice.reducer
