import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState:null,
    reducers: {
        addRequests: (state, action) =>action.payload,
        removeRequests: (state, action) => {
            if (!state || !Array.isArray(state)) return state;
            return state.filter(req => req.requestId !== action.payload);
        },
        clearRequests:()=>null,
       
       
    }
});

export const { addRequests, removeRequests, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;

