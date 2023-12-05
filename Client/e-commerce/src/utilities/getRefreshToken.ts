const getRefreshToken = () :string | null => {
    const token = localStorage.getItem("token")
    if(token){
        const { refreshToken } = JSON.parse(token)
        return refreshToken
    }
    return null
}