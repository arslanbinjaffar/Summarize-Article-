import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import dotenv from 'dotenv'
	//headers


dotenv.config()

const articleApi=createApi({
   reducerPath:'articleApi',
   baseQuery:fetchBaseQuery({baseUrl:"https://article-extractor-and-summarizer.p.rapidapi.com/",
   prepareHeaders:(headers)=>{
    headers.set("X-RapidAPI-Key",process.env.KEY);
    headers.set("X-RapidAPI-Host",'article-extractor-and-summarizer.p.rapidapi.com');
    return headers;
   }
  
  }),
   endpoints: (builder) => ({
    getSummary:builder.query({
      query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    })
    }),
})

export default articleApi;

export const {useLazyGetSummaryQuery}=articleApi;