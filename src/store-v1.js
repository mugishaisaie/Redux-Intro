import { type } from "@testing-library/user-event/dist/type"
import { combineReducers, createStore } from "redux"  
  
  const initialStateAccount ={
    balance:0,
    loan:0,
    loanPurpose:""

  }
  const initialStateCustomer ={
    fullName:"",
    nationalID:"",
    createdAt:""

  }

  function accountReducer(state= initialStateAccount,action){
    switch(action.type){
        case "account/deposit":
            return {...state, balance: state.balance + action.payload}
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
    

            default:
                return state
    }
  }
  const rootReducer = combineReducers({
      account: accountReducer,
      customer:customerReducer
    })
    const store = createStore(rootReducer)
//   store.dispatch({type: 'account/deposit',payload: 500})

//   console.log(store.getState())
//   store.dispatch({type: 'account/withdraw',payload: 200})

//   console.log(store.getState())
//   store.dispatch({type: 'account/requestLoan',payload: {
//     loan: 1000,
//     loanPurpose: "Buy a cheap car"
//   }})

//   console.log(store.getState())
//   store.dispatch({type:"account/payLoan"})
//   console.log(store.getState())

function deposit(amount){
    return {type: 'account/deposit',payload: amount}
}
function withdraw(amount){
    return {type: 'account/withdraw',payload: amount}
}
function requestLoan(amount,purpose){
    return {type: 'account/requestLoan',payload: {
            loan: amount,
            loanPurpose: purpose
          }}
}
function payLoan(amount){
    return {type:"account/payLoan"}
}

store.dispatch(deposit(1000))
console.log(store.getState())
store.dispatch(withdraw(500))
console.log(store.getState())
store.dispatch(requestLoan(1500,"buying a Laptop"))
console.log(store.getState())
store.dispatch(payLoan())
console.log(store.getState())


// 
function customerReducer(state = initialStateCustomer,action){
    switch(action.type){
        case "account/createCustomer":
            return{
                ...state,fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }
        case "account/updateCustomer":
            return{
                ...state,fullName: action.payload.fullName,
                nationalID: state.nationalID,
                createdAt: state.createdAt
            }
        default: return state   
    }
}





function createCustomer(fullName,nationalID){
    return {type:'account/createCustomer', payload:{
        fullName: fullName,
        nationalID:nationalID,
        createdAt: new Date().toLocaleString()
    }}
}
function updateCustomer(fullName){
    return {type:'account/updateCustomer', payload:
        fullName
        
    }
}
    store.dispatch(createCustomer('Mugisha Isaie','8765432'))
    console.log(store.getState())
    store.dispatch(createCustomer('Mugisha Isaie','8765432'))
    console.log(store.getState())