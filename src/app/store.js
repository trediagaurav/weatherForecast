import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postApi } from '../services/Post';
import rootReducer from '../reducer/rootReducer';

export const store = configureStore({
    
    reducer:{
       [postApi.reducerPath]: postApi.reducer,
        counter: rootReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

setupListeners(store.dispatch)