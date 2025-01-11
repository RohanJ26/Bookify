import React , {useState,useEffect} from "react";
import { useFirebase } from "../context/firebase";
import Card from "../Components/Card";

const Order = ()=>{

    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (firebase.isLoggedin)
          firebase
            .fetchMyBooks(firebase.user.uid)
            ?.then((books) => setBooks(books.docs));
      }, [firebase]);

      if (!firebase.isLoggedin) return <h1>Please log in</h1>;

    return(
        <div className="mt-5 flex gap-5 flex-wrap px-10 py-5">
          {books.map((book) => (
            <Card
              link={`/books/orders/${book.id}`}
              key={book.id}
              id={book.id}
              {...book.data()}
            />
          ))}
        </div>
    );
}

export default Order;