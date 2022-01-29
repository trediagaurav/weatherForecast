import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    count : 0
}

export const rootReducer = createSlice({
    name: 'counter',
    initialState : initialStateValue,
    reducers: {
      increment: (state) => {
        state.count += 1
      },
      decrement: (state) => {
        state.count -= 1
      },
      incrementByAmount: (state, action) => {
        state.count += action.payload
      },
    },
  })
  export const { increment, decrement, incrementByAmount } = rootReducer.actions

export default rootReducer.reducer