import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast"

const Details = () => {
    const params = useParams();
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [data,setData] = useState(null);
    const [qty,setQty] = useState(1);
    useEffect(()=>{
      if(firebase.isLoggedin==false){
        toast("Login to your account", { id: "login-toast" });
        navigate('/login')
      }
    },[])
    
    useEffect(() => {
        firebase.getBookById(params.bookid).then((val)=>(setData(val.data())));
    },[]);

    const Order = async () => {
        const result = await firebase.placeOrder(params.bookid, qty);
        console.log("Order Placed", result);
    };

    if (data == null) return <h1>Loading...</h1>;
    
    return(
    <>
    <div className="flex flex-col gap-5 items-center"> 
      <h1 className="text-5xl font-semibold">{data.name}</h1>
      <h1 className="text-2xl">Details</h1>
      <div className="">
        <p>Price: Rs. {data.price}</p>
        <p>ISBN Number: {data.isbn}</p>
      </div>
      <h1 className="text-2xl">Owner Details</h1>
      <div className="">
        <p>Name: {data.displayName}</p>
        <p>Email: {data.userEmail}</p>
      </div>
      <form class="max-w-sm mx-auto">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
        <input type="Number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>setQty(e.target.value)} value={qty} required />
        </form>
        <button className="bg-green-500 p-2 rounded-lg text-white font-semibold" onClick={Order}>Buy Now</button>
    </div>
    <Toaster
        position="top-center"
        reverseOrder={true}
    />
    </>
    )
}

export default Details;