import { useDispatch, useSelector } from "react-redux";

function Customer() {
  const customer = useSelector(store=> store.customer.fullName); 
  console.log(customer)

  return <h2 className="customer">👋 Welcome, {customer}</h2>;
}

export default Customer;
