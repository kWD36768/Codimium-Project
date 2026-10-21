import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    value : []
}

const leadSlice = createSlice({
    name : "Lead",
    initialState,
    reducers  : {
        leadData  : (state , action) =>{
            state.value = action.payload
        } ,

        deleteLeadData : (state ,action) =>{
            state.value = state.value.filter((lead) => lead._id !== action.payload)
        }

    }
})

export default leadSlice.reducer ;

export const {leadData} = leadSlice.actions
