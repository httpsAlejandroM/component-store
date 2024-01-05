import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'
import { AuthState, userResponse } from '../../interfaces/user.interface'
import { getRefreshToken } from '../../utilities/getRefreshToken'
import { getAccessToken, getUserInfo } from '../../auth/AuthHelpers'
import { ComponentInterface } from '../../interfaces'

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
      const { email, userName, image, favorites, cart } = action.payload.data.userInfo
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          userName,
          email,
          image,
          favorites,
          cart
        }
      }
    },
      setFavOrCart: (state, action: PayloadAction<{componentFav?:ComponentInterface, cart?: ComponentInterface}>) =>{
        const {componentFav} = action.payload
        
        
        let result 
        if(componentFav){
         const existComponent = state.userInfo.favorites?.some((component)=> component._id === componentFav._id)
        
         
         if(existComponent){
          result = state.userInfo.favorites?.filter((component)=> component._id !== componentFav._id)
         }
         else{
          result = state.userInfo.favorites?.concat(componentFav)
         }
        }

        return {
          ...state,
          userInfo:{
            ...state.userInfo,
            favorites: result || []
          }
        }
      }
    ,
    updateState: (state, action: PayloadAction<ComponentInterface[]>) =>{
      const arrayComponents  = action.payload
      
      let result:ComponentInterface[]  = []

      if(arrayComponents) result = result.concat(arrayComponents)

      return {
        ...state,
        userInfo:{
          ...state.userInfo,
          favorites: result || []
        }
      }
    }
  ,
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

export const { getUser, setTokens, clearTokens, setFavOrCart, updateState } = userSlice.actions

export default userSlice.reducer
