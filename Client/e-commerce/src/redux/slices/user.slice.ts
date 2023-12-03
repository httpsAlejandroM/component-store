import { createSlice } from '@reduxjs/toolkit'
import {type PayloadAction} from '@reduxjs/toolkit'
import { AuthState } from '../../interfaces/user.interface'

const initialState: AuthState = {
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
    userName: "",
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action:PayloadAction<AuthState>) => {
         const {email, image, userName} = action.payload
         
         return {
          ...state,
          userName,
          email,
          image
         }
    },
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      const { accessToken, refreshToken } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        accessToken,
        refreshToken,
      };
    },
    clearTokens: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        accessToken: "",
        refreshToken: "",
      };
    }
  },
})

export const { getUser } = userSlice.actions

export default userSlice.reducer
