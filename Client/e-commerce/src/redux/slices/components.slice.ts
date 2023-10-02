import { createSlice } from '@reduxjs/toolkit'
import {type PayloadAction} from '@reduxjs/toolkit'
import { ComponentInterface } from '../../interfaces'

const initialState: ComponentInterface[] = []

export const componentSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    getComponents: (state, action:PayloadAction<ComponentInterface>) => {
         console.log(state, action)
    }
  },
})

export const {getComponents } = componentSlice.actions

export default componentSlice.reducer
