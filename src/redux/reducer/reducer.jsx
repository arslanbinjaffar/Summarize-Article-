import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

	//headers




const articleApi=createApi({
   reducerPath:'articleApi',
   baseQuery:fetchBaseQuery({baseUrl:"https://article-extractor-and-summarizer.p.rapidapi.com/",
   prepareHeaders:(headers)=>{
    headers.set("X-RapidAPI-Key",'6b6253ef73msh41b25e62f0bc1dfp123147jsna01b49f9d306');
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