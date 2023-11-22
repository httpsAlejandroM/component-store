import { createSlice } from '@reduxjs/toolkit'
import {type PayloadAction} from '@reduxjs/toolkit'
import { User, userResponse } from '../../interfaces/user.interface'

const initialState: User = {
    id: "",
    name: "",
    email: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action:PayloadAction<userResponse>) => {
         console.log(state, action)
    }
  },
})

export const { getUser } = userSlice.actions

export default userSlice.reducer
