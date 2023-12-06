import { useContext, createContext, useState } from "react"
import { userResponse } from "../interfaces/user.interface"

interface AuthProviderProps{
    children: React.ReactNode
}

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: ()=>{},
    saveUser: (userData: userResponse) => {}
})

export function AuthProvider({children}: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated ] = useState(false)
    const [accessToken, setAccessToken ] = useState("")
    const [refreshToken, setRefreshToken ] = useState("")

    function getAccessToken(){
        return accessToken
    } 

    function saveUser(userData:userResponse){
        setAccessToken(userData.data.accessToken)
        setRefreshToken(userData.data.refreshToken)

        localStorage.setItem("token", JSON.stringify(userData.data.refreshToken))
    }

  return (
  <AuthContext.Provider  value={{isAuthenticated, getAccessToken, saveUser}}>
    {children}
  </AuthContext.Provider>
  )
}

export const useAuth = () => {useContext(AuthContext)}