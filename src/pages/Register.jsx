import React, { useEffect } from "react";
import { useState } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

const RegisterPage = ()=>{

    const firebase = useFirebase();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(firebase.isLoggedin){
            navigate('/');
        }
    },[firebase])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await firebase.SignUpuserwithEmailandPassword(email,password,name);
        toast.success('Registered successfully');
    }

    return(
        <>
            <div className="text-center mt-5 font-medium text-3xl">REGISTER ACCOUNT</div>
            <form class="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>    
            <div class="mb-5">
                <label class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                <input class="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>(setName(e.target.value))} value={name} required />
            </div>
            <div class="mb-5">
                <label for="email" class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" id="email" class="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@bookify.com" onChange={(e)=>(setEmail(e.target.value))} value={email} required />
            </div>
            <div class="mb-5">
                <label for="password" class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" class="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>(setPassword(e.target.value))} value={password} required />
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>  
            </form>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </>
    )  

}

export default RegisterPage;