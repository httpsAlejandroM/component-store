import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userResponse } from '../../interfaces/user.interface'

const baseUrl = "http://localhost:3000/users/"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials
            }),
            transformResponse: (response: userResponse) => {
                const { email, userName, image } = response.data
                return {
                    image,
                    email,
                    userName
                }
            }
        })
    })
})

export const { useLoginMutation } = userApi
