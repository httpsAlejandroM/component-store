import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'
import { AuthState, userResponse } from '../../interfaces/user.interface'
import { getRefreshToken } from '../../utilities/getRefreshToken'
import { getAccessToken, getUserInfo } from '../../auth/AuthHelpers'

export const checkAuth = createAsyncThunk("userInfo/checkAutch", async (_, { getState }) => {
  const currentState = getState() as AuthState
  if (currentState.accessToken) {
    const userInfo = await getUserInfo(currentState.accessToken)
    if (userInfo) {
      console.log(userInfo);
      return userInfo
    }
    return null
  } else {
    const token = getRefreshToken()
    if(token){
      const newAccessToken = await getAccessToken()
      if(newAccessToken){
        const userInfo = await getUserInfo(newAccessToken)        
        if(userInfo){
          return userInfo
        }
      }
    }
    return 
  }
})

type Status = {
  loading: boolean
}

const initialState: AuthState & Status= {
  isAuthenticated: false,
  loading: false,
  accessToken: "",
  refreshToken: "",
  userInfo: {
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
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<userResponse>) => {
      const { email, userName, image } = action.payload.data.userInfo
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          userName,
          email,
          image
        }
      }
    },
    setTokens: (state, action: PayloadAction<userResponse>) => {
      const { refreshToken, isAuthenticated, accessToken } = action.payload.data;

      if (refreshToken) {
        localStorage.setItem("token", JSON.stringify(refreshToken))
      }

      return {
        ...state,
        isAuthenticated,
        accessToken
      };
    },
    clearTokens: (state) => {
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        localStorage.removeItem("token")
      } 
      return {
        ...state,
        isAuthenticated: false,
        accessToken: "",
        refreshToken: "",
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        return {
          ...state,
          loading: true
        }
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if(action.payload){
          const { isAuthenticated, userInfo } = action.payload.data
          return {
            ...state,
            isAuthenticated,
            userInfo,
            loading: false
          }
        }
        
      })
      .addCase(checkAuth.rejected, (state) => {
        return{
          ...state,
          loading: false
        }
      });
  },
})

export const { getUser, setTokens, clearTokens } = userSlice.actions

export default userSlice.reducer
