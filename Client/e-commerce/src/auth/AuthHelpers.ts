import { userResponse } from "../interfaces/user.interface";
import { API } from "../redux/componentsApi/componentsApi";
import { getRefreshToken } from "../utilities/getRefreshToken";

const getUserInfo = async (accessToken: string) => {
  try {
    const response = await fetch(`${API}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (response.ok) {
      const json = await response.json() as userResponse
      if (json.error) {
        console.log(json.data.message);
        return
      } else {
        return json
      }
    }
  } catch (error) {
    console.log(`getUserInfo error: ${error}`);
  }
}

const getAccessToken = async () => {
  try {
    const response = await fetch(`${API}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getRefreshToken()}`
      }
    })
    const json = await response.json() as userResponse
    if (json.error) {
      console.log(json.data.message);
      return null
    } else {
      return json.data.accessToken
    }

  } catch (error) {
    console.log(`getAccessToken error: ${error}`);
  }
}

export {
  getUserInfo,
  getAccessToken
}