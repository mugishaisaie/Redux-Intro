const initialStateAccount ={
    balance:0,
    loan:0,
    loanPurpose:"",
    isLoading: false

  }

  export default function accountReducer(state= initialStateAccount,action){
    switch(action.type){
        case "account/deposit":
            return {...state, balance: state.balance + action.payload,isLoading: false}
        case "account/withdraw":
            return {...state, balance: state.balance - action.payload}
        case "account/requestLoan":
            if(state.loan > 0) return
            // Later
            return {...state, loan:action.payload.loan,loanPurpose: action.payload.loanPurpose,
                balance: state.balance + action.payload.loan
            }
            
        case "account/payLoan":
            
            return {...state,loan: 0, loanPurpose:"",
                balance: state.balance - state.loan
            }
            case "account/convertingCurrency":
                return {...state,isLoading: true}
    

            default:
                return state
    }
  }

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
  export function withdraw(amount){
      return {type: 'account/withdraw',payload: amount}
  }
  export function requestLoan(amount,purpose){
      return {type: 'account/requestLoan',payload: {
              loan: amount,
              loanPurpose: purpose
            }}
  }
  export function payLoan(amount){
      return {type:"account/payLoan"}
  }
  