import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { QueryApi, ResponseBackend } from '../../interfaces'

const API = "http://localhost:3000"


export const componentsApi = createApi({
  reducerPath: 'componentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API, }),
  endpoints: (builder) => ({
    getComponents: builder.query<ResponseBackend, QueryApi>({
      //destructuro las propiedades que necesito para la query y sumo sus valores a la query en caso de que los haya
      query: ({ title, category, brand, order, page, perPage, minPrice, maxPrice }) => {
        let query = '/components?';
        if (title) query += `&title=${title}`;
        if (category) query += `&category=${category}`;
        if (brand) query += `&brand=${brand}`;
        if (order) query += `&order=${order}`
        if (page) query += `&page=${page}`
        if (perPage) query += `&perPage=${perPage}`
        if (minPrice) query += `&minPrice=${minPrice}`
        if (maxPrice) query += `&maxPrice=${maxPrice}`
        return query;
      },
    }),

  }),

})

export const { useGetComponentsQuery, useLazyGetComponentsQuery } = componentsApi