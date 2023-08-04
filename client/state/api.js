import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/openai/'}),
    reducerPath: "main",
    tagTypes: [],
    endpoints: (build) => ({
      postAiText: build.mutation({
        query: (payload) => ({
          url: "send",
          method: "POST",
          body: payload,
        }),
      }),
      getAiText: build.query({
          query: () => 'responses',
          staleTime: 5000,
          refetchOnMount: false, // Prevent initial refetch
          refetchOnReconnect: false, // Prevent refetch on reconnect
        }),
        deleteAiText: build.mutation({
          query: (id) => ({
            url: `delete/${id}`, 
            method: 'DELETE',
          }),
          
        }),
    }),
  });
  
  export const {
    useGetAiTextQuery,
    usePostAiTextMutation,
    useDeleteAiTextMutation
  } = api;