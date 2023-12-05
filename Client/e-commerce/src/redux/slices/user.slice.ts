import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'
import { AuthState, userResponse } from '../../interfaces/user.interface'
//const token = localStorage.getItem("token")
const BASE_URL = "http://localhost:3000/users"


export const requestNewAccessToken = createAsyncThunk("reqNewToken", async (refreshToken:string) => {
  const response = await fetch(`${BASE_URL}/refresh-token`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${refreshToken}`
    }
  })
  if(response.ok){
    const json = await response.json()
    return json.data.accessToken
  }
})

export const checkAuth = createAsyncThunk(`checkAuth`, async () =>{
  if(initialState.accessToken){
//el usuario esta autenticado
  }
  else{
    //el usuario no est autenticado
    const token = getRefreshToken()
    if(token){

    }
  }
} )

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken:"",
  userInfo: {
    id: "",
    name: "",
    email: "",
    banned: false,
    birthday: "",
    cart: [],
    favorites: [],
    image: "https://elcomercio.pe/resizer/O8x8YYFbZZTw4nrrPgyCOpwELMM=/580x330/smart/filters:format(jpeg):quality(90)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/PGYD2K7YIFDU3GGYJIOPLCPAPY.jpg",
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
      const { email, userName } = action.payload.data.userInfo
      
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          userName,
          email,
          //image
        }
      }
    },
    setTokens: (state, action: PayloadAction<userResponse>) => {
      const { accessToken, refreshToken, isAuthenticated } = action.payload.data;

       localStorage.setItem("token", JSON.stringify(refreshToken))
      
      return {
        ...state,
        isAuthenticated,
        accessToken,
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

export const { getUser, setTokens, clearTokens } = userSlice.actions

export default userSlice.reducer
