import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ResponseBackend } from '../../interfaces'

const API = "http://localhost:3000"

export const componentsApi = createApi({
    reducerPath: 'componentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API,  }),
    endpoints: (builder) => ({
      // getComponents: builder.query<ResponseBackend, void>({
      //   query: () => `components`,
      // }),
    getComponents:  builder.query<ResponseBackend, { title?: string, category?: string, brand?: string }>({
      //destructuro las propiedades que necesito para la query y sumo sus valores a la query en caso de que los haya
      query: ({ title, category, brand }) => {
          let query = 'components?';
          if (title) {
              query += `&title=${title}`;
          }
          if (category) {
              query += `&category=${category}`;
          }
          if (brand) {
              query += `&brand=${brand}`;
          }
          return query;
      },
    }),

    }),
    
  }) 

export const {  useGetComponentsQuery, useLazyGetComponentsQuery } = componentsApi