import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const ViewOrderDetails = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase.getOrders(params.bookid).then((val) => setOrders(val.docs));
  }, []);
  
  if(orders.length===0){
    return(
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-semibold text-3xl">Orders</h1>
        <h1 className="text-sm">No orders placed for this book yet...</h1>
      </div>
    )
  } 

  return (
    <div className="container mt-3 flex flex-col items-center">
      <h1 className="font-semibold text-3xl">Orders</h1>
      <div className="flex flex-col gap-3 w-2/3">
        {orders.map((order) => {
          const data = order.data();
          return (
            <div
              key={order.id}
              className="mt-5 border-[1px] border-black border-solid p-[10px]"
            >
              <h5>Order By: {data.displayName}</h5>
              <h6>Qty: {data.qty}</h6>
              <p>Email: {data.userEmail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewOrderDetails;