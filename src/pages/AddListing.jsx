import React, { useState } from "react";
import { useFirebase } from "../context/firebase";

const AddListing = ()=>{

    const firebase = useFirebase();

    const [bookName , SetBookName] = useState("");
    const [isbn , SetIsbn] = useState("");
    const [price , SetPrice] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await firebase.handleCreateNewListing(bookName, isbn, price);
    }

    return(
        <div className="flex flex-col justify-center items-center ">
            <div className="text-center mt-5 font-medium text-3xl">ADD BOOKS HERE</div>
            <form class="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>    
                <div class="mb-5">
                    <label class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Book Name</label>
                    <input class="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>(SetBookName(e.target.value))} value={bookName} required />
                </div>
                <div class="mb-5">
                    <label class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">ISBN</label>
                    <input class="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>(SetIsbn(e.target.value))} value={isbn} required />
                </div>
                <div class="mb-5">
                    <label class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input class="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>(SetPrice(e.target.value))} value={price} required />
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Book</button>
            </form>
        </div>
    )
}

export default AddListing