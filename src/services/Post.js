import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_KEY = 'POXjKcCCN8rnR4GXlGYCCbAQ4KeDNWn4';

export const postApi = createApi({

    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dataservice.accuweather.com/',
    }),

    endpoints:(builder)=>({
        getAllPost: builder.query({
            query: () => {
                return {
                    url: `currentconditions/v1/topcities/150?apikey=${API_KEY}`,
                    method: 'GET'
                }  
            }
        }),

        getCurrentClimate: builder.query({
            query:(param)=>{
                return{
                    url:`currentconditions/v1/${param}?apikey=${API_KEY}`,
                    method : 'GET'
                }
            }
        }),
        getforecastClimate: builder.query({
            query:(param)=>{
                return{
                    url:`forecasts/v1/daily/5day/${param}?apikey=${API_KEY}`,
                    method : 'GET'
                }
            }
        })
    })
    

})

export const { useGetAllPostQuery, useGetCurrentClimateQuery, useGetforecastClimateQuery } = postApi