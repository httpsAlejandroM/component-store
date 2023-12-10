  // const userInfo = useAppSelector((state) => state.userReducer)
  //const dispatch = useAppDispatch()

  // const checkAuth = async () => {
  //   if (userInfo.accessToken) {
  //     const user = await getUserInfo(userInfo.accessToken)
  //     if (user) {
  //       dispatch(getUser(user))
  //       dispatch(setTokens(user))
  //     }
  //   } else {
  //     const token = getRefreshToken()
  //     if (token) {
  //       const newAccessToken = await getAccesToken()
  //       if (newAccessToken) {
  //         const user = await getUserInfo(newAccessToken)
  //         if (user) {
  //           dispatch(getUser(user))
  //           dispatch(setTokens(user))
  //         }
  //       }
  //     }
  //     return 
  //   }
  // }

  // const getAccesToken = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL_AUTH}/refresh-token`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userInfo.refreshToken}`
  //       }
  //     })
  //     const json = await response.json() as userResponse
  //     if (json.error) {
  //       console.log(json.data.message);
  //       return null
  //     } else {
  //       dispatch(setTokens(json))
  //       return json.data.accessToken
  //     }

  //   } catch (error) {
  //     console.log(error);
  //     return null
  //   }
  // }

  // const getUserInfo = async (accessToken: string) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/users`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     })
  //     if (response.ok) {
  //       const json = await response.json() as userResponse
  //       if (json.error) {
  //         console.log(json.data.message);
  //         return
  //       } else {
  //         return json
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return
  //   }
  // }

  // useEffect(() => {
  //  dispatch( checkAuth())
  // }, [])
