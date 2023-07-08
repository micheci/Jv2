import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000'}),
    reducerPath: "main",
    tagTypes: [],
    endpoints: (build) => ({
      postAiText: build.mutation({
        query: (payload) => ({
          url: "openai/send",
          method: "POST",
          body: payload,
        }),
      }),
      
   
    }),
  });
  
  export const {
    usePostAiTextMutation,
   
  } = api;