import React, { useState , useEffect } from "react";
import Card from "../Components/Card";
import { useFirebase } from "../context/firebase";

const HomePage = ()=>{

    const firebase = useFirebase();

    const [books,setBooks] = useState([]);
    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs)
        );
    }, []);

    return(
        <div className="container mt-5 flex gap-5 flex-wrap px-10 py-5">
            {books.map((book) => (
            <Card
                link={`/book/view/${book.id}`}
                key={book.id}
                id={book.id}
                {...book.data()}
            />
            ))}
    </div>
    )
}

export default HomePage;