import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ResponseBackend } from '../../interfaces'

const API = "http://localhost:3000"

export const componentsApi = createApi({
    reducerPath: 'componentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API,  }),
    endpoints: (builder) => ({
      getComponents: builder.query<ResponseBackend, void>({
        query: () => `components`,
      }),
    }),
  }) 

export const { useGetComponentsQuery } = componentsApi