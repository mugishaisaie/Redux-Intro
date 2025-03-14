import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    balance:0,
    loan:0,
    loanPurpose:"",
    isLoading: false

  }

  const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers: {
        deposit(state,action){
            state.balance +=action.payload;
            state.isLoading = false;
        },
        withdraw(state,action){
            state.balance -= action.payload
        
        },
        requestLoan:{
            prepare(amount,purpose){
                return{
                    payload: {amount,purpose},
                };
            },
            
            reducer(state,action){
            if(state.loan >0) return;
            state.loan = action.payload.amount;
            state.loanPurpose =action.payload.purpose;
            state.balance += action.payload.amount
        }},
        payLoan(state){
            state.balance -= state.loan
            state.loan = 0;
            state.loanPurpose ="";
        },
        convertingCurrency(state){
            state.isLoading = true;

        }

    }
  })


  export function deposit(amount,currency){
        if(currency === "USD") return {type: 'account/deposit',payload: amount}
    
        // API calls
        return async function(dispatch,getState){
            dispatch({type: "account/convertingCurrency"})
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    
    const data = await res.json();
    // console.log(data)
    const converted =data.rates.USD;
    // console.log(converted)
    dispatch({type: 'account/deposit',payload: converted})
    
    
    }
    
      }
     
  console.log(accountSlice)
  export const {withdraw,requestLoan,payLoan} = accountSlice.actions
  export default accountSlice.reducer



//             return {...state,loan: 0, loanPurpose:"",
//                 balance: state.balance - state.loan
//             }
//             case "account/convertingCurrency":
//                 return {...state,isLoading: true}
    

//             default:
//                 return state
//     }
//   }

//   export function deposit(amount,currency){
//     if(currency === "USD") return {type: 'account/deposit',payload: amount}

//     // API calls
//     return async function(dispatch,getState){
//         dispatch({type: "account/convertingCurrency"})
// const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

// const data = await res.json();
// // console.log(data)
// const converted =data.rates.USD;
// // console.log(converted)
// dispatch({type: 'account/deposit',payload: converted})


// }

//   }
//   export function withdraw(amount){
//       return {type: 'account/withdraw',payload: amount}
//   }
//   export function requestLoan(amount,purpose){
//       return {type: 'account/requestLoan',payload: {
//               loan: amount,
//               loanPurpose: purpose
//             }}
//   }
//   export function payLoan(amount){
//       return {type:"account/payLoan"}
//   }
  