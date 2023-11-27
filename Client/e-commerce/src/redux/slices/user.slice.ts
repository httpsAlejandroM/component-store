import { createSlice } from '@reduxjs/toolkit'
import {type PayloadAction} from '@reduxjs/toolkit'
import { userInfo } from '../../interfaces/user.interface'

const initialState: userInfo = {
    id: "",
    name: "",
    email: "",
    banned: false,
    birthday: "",
    cart: [],
    favorites: [],
    image: "",
    isAdmin: false,
    direction: "",
    userName: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action:PayloadAction<userInfo>) => {
         const {email, image, userName} = action.payload
         
         return {
          ...state,
          userName,
          email,
          image
         }
    }
  },
})

export const { getUser } = userSlice.actions

export default userSlice.reducer
