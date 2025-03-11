const initialStateCustomer ={
    fullName:"",
    nationalID:"",
    createdAt:""

  }

  export default function customerReducer(state = initialStateCustomer,action){
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





export  function createCustomer(fullName,nationalID){
    return {type:'account/createCustomer', payload:{
        fullName: fullName,
        nationalID:nationalID,
        createdAt: new Date().toLocaleString()
    }}
}
export function updateCustomer(fullName){
    return {type:'account/updateCustomer', payload:
        fullName
        
    }
}