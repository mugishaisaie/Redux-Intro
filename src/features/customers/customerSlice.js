const initialStateCustomer ={
    fullName:"",
    nationalID:"",
    createdAt:""

  }

  export default function customerReducer(state = initialStateCustomer,action){
    switch(action.type){
        case "customer/createCustomer":
            return{
                ...state,fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }
        case "customer/updateCustomer":
            return{
                ...state,fullName: action.payload.fullName,
                nationalID: state.nationalID,
                createdAt: state.createdAt
            }
        default: return state   
    }
}





export  function createCustomer(fullName,nationalID){
    return {type:'customer/createCustomer', payload:{
        fullName: fullName,
        nationalID:nationalID,
        createdAt: new Date().toLocaleString()
    }}
}
export function updateCustomer(fullName){
    return {type:'customer/updateCustomer', payload:
        fullName
        
    }
}