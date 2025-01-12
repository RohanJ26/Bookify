import React from "react";
import { useFirebase } from "../context/firebase";
import { signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import toast,{Toaster} from "react-hot-toast";

const Navbar = ()=>{

    const firebase = useFirebase();
    const navigate = useNavigate();
    const url = window.location.href;
    let lastPart = url.substring(url.lastIndexOf('/')+1);
    

    const HandleLogout = async ()=>{
        await signOut(firebase.FirebaseAuth);
        navigate('/login')
        toast.success('Logged Out successfully');
    }

    return(
        <>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://cdn.vectorstock.com/i/500p/75/33/creative-open-book-logo-vector-13687533.jpg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bookify</span>
        </a>
        <div class="flex md:order-2">
            <div class="relative hidden md:block">
                {
                lastPart == 'register' ? 
                <button type="button" onClick={()=>(navigate('/login'))} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Login</button> :
                lastPart =='login' ? 
                <button type="button" onClick={()=>(navigate('/register'))}class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Register</button> :
                firebase.isLoggedin == false ? 
                <button type="button" onClick={()=>(navigate('/login'))} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Login / Register</button> :
                <button type="button" onClick={HandleLogout} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Logout</button>
                }
            </div>
            <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                <a href="/" class={`block py-2 px-3 rounded ${ lastPart == '' ?'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>Home</a>
                </li>
                {firebase.isLoggedin ? 
                <>
                <li>
                <a href="/addListing" class={`block py-2 px-3 rounded ${ lastPart == 'addListing' ?'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>Add Listing</a>
                </li>
                <li>
                <a href="/order" class={`block py-2 px-3 rounded ${ lastPart == 'order' ?'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>Order</a>
                </li>
                </>:<></>}
                
            </ul>
            </div>
        </div>
        </nav>
        <Toaster
            position="top-center"
            reverseOrder={true}
        />

        </>
    )
}

export default Navbar;