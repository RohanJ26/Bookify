import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
    const navigate = useNavigate();
    return(
        <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-[350px]">
                <div class="p-5 flex flex-col gap-3">
                <h5 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
                <div className="pl-5">-{props.displayName}</div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-semibold text-gray-900 dark:text-white">${props.price}</span>
                    <button onClick={(e)=>(navigate(props.link))} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 min-w-28">Read More <span className="font-bold">&#8594;</span></button>
                </div>
            </div>
        </div>
    )
}

export default Card;