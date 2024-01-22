import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'
import { AuthState, userResponse } from '../../interfaces/user.interface'
import { getRefreshToken } from '../../utilities/getRefreshToken'
import { getAccessToken, getUserInfo } from '../../auth/AuthHelpers'
import { CartComponentInterface, ComponentInterface } from '../../interfaces'

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
    if (token) {
      const newAccessToken = await getAccessToken()
      if (newAccessToken) {
        const userInfo = await getUserInfo(newAccessToken)
        if (userInfo) {
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

const initialState: AuthState & Status = {
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
    setFavOrCart: (state, action: PayloadAction<{ componentFav?: ComponentInterface, cartComponent?: CartComponentInterface }>) => {
      const { componentFav, cartComponent } = action.payload


      let result
      if (componentFav) {
        const existComponent = state.userInfo.favorites?.some((component) => component._id === componentFav._id)


        if (existComponent) {
          result = state.userInfo.favorites?.filter((component) => component._id !== componentFav._id)
        }
        else {
          result = state.userInfo.favorites?.concat(componentFav)
        }
      }
      let cartResult
      if (cartComponent) {
        const existComponent = state.userInfo.cart?.find((component) => component._id === cartComponent._id)
        if (existComponent) {
          const newQuantity = existComponent.quantity + cartComponent.quantity
          const updatedQuantity = { ...existComponent, quantity: newQuantity }
          const filteredComponent = state.userInfo.cart?.filter((component) => component._id !== cartComponent._id)
          cartResult = [...filteredComponent, updatedQuantity]
        }
        else {
          cartResult = state.userInfo.cart.concat(cartComponent)
        }
      }

      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          favorites: result || [],
          cart: cartResult || []
        }
      }
    }
    ,
    updateState: (state, action: PayloadAction<ComponentInterface[] | any>) => {
      const arrayComponents = action.payload
      const { cartComponent } = action.payload

      let result: ComponentInterface[] = []
      let newCartList


      if (arrayComponents) result = result.concat(arrayComponents)
      if(cartComponent){
        const filteredCartProducts = state.userInfo.cart?.filter((component)=> component._id !== cartComponent._id)
         newCartList = [...filteredCartProducts, cartComponent]
      }
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          favorites: result || [],
          cart: newCartList || []
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
        if (action.payload) {
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
        return {
          ...state,
          loading: false
        }
      });
  },
})

export const { getUser, setTokens, clearTokens, setFavOrCart, updateState } = userSlice.actions

export default userSlice.reducer
