import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"

const initialState ={
    fullName:"",
    nationalID:"",
    createdAt:""

  }

  const createCustomerSlice = createSlice({
    name : 'customer',
    initialState,
    reducers: {
        createCustomer:{
            prepare(fullName,nationalID){
                return {
                    payload :{fullName,nationalID,createdAt: new Date().toLocaleString()},
                };

            },
            reducer(state,action){
            state.fullName = action.payload.fullName;
            state.nationalID = action.payload.nationalID;
            state.createdAt = action.payload.createdAt;
        }},
        updateCustomer(state,action){
            state.fullName = action.payload.fullName;
        }
    }
  })
  console.log(createCustomerSlice)
  export const {createCustomer,updateCustomer} =createCustomerSlice.actions;

  export default createCustomerSlice.reducer;

//   export default function customerReducer(state = initialStateCustomer,action){
//     switch(action.type){
//         case "customer/createCustomer":
//             return{
//                 ...state,fullName: action.payload.fullName,
//                 nationalID: action.payload.nationalID,
//                 createdAt: action.payload.createdAt
//             }
//         case "customer/updateCustomer":
//             return{
//                 ...state,fullName: action.payload.fullName,
//                 nationalID: state.nationalID,
//                 createdAt: state.createdAt
//             }
//         default: return state   
//     }
// }





// export  function createCustomer(fullName,nationalID){
//     return {type:'customer/createCustomer', payload:{
//         fullName: fullName,
//         nationalID:nationalID,
//         createdAt: new Date().toLocaleString()
//     }}
// }
// export function updateCustomer(fullName){
//     return {type:'customer/updateCustomer', payload:
//         fullName
        
//     }
// }