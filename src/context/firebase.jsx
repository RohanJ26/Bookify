import React from "react";
import { createContext,useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup , updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, where, query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBMSEj6Q3eIRFOJqw_zgDosVN681eg5ZfE",
    authDomain: "bookify-web-app-2840c.firebaseapp.com",
    projectId: "bookify-web-app-2840c",
    storageBucket: "bookify-web-app-2840c.firebasestorage.app",
    messagingSenderId: "278393681589",
    appId: "1:278393681589:web:5708821385079183a5f0fc"
};

const firebaseContext= createContext(null);

export const useFirebase = ()=> useContext(firebaseContext)

const firebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(firebaseApp);
const Firebasedb = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) =>{

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, (user) => {
        if (user) setUser(user);
        else setUser(null);
        });
    }, []);

    const SignUpuserwithEmailandPassword = async (email,password,name)=>{
        createUserWithEmailAndPassword(FirebaseAuth,email,password,name).
        then(() => {
            updateProfile(FirebaseAuth.currentUser,{
                displayName: name
            });
         })
        
    }

    const SignInwithEmailandPassword = (email,password,displayName)=>{
        signInWithEmailAndPassword(FirebaseAuth,email,password,displayName);
    }

    const SignInwithGoogle = () => (signInWithPopup(FirebaseAuth,googleProvider));

    const handleCreateNewListing = async (name, isbn, price) => {
        return await addDoc(collection(Firebasedb, "books"), {
          name,
          isbn,
          price,
          userID: user.uid,
          userEmail: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      };
    
    const listAllBooks = () => {
    return getDocs(collection(Firebasedb, "books"));
    };

    const getBookById = async (id)=>{
        const docRef = doc(Firebasedb, "books", id);
        const docSnap = await getDoc(docRef);
        return docSnap;
    };

    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(Firebasedb, "books", bookId, "orders");
        const result = await addDoc(collectionRef, {
          userID: user.uid,
          userEmail: user.email,
          displayName: user.displayName,
          qty: Number(qty),
        })
        console.log(result);
        
        
        return result;
    };

    const fetchMyBooks = async (userId) => {
        const collectionRef = collection(Firebasedb, "books");
        const q = query(collectionRef, where("userID", "==", userId));
    
        const result = await getDocs(q);
        return result;
    };
    
    const getOrders = async (bookId) => {
        const collectionRef = collection(Firebasedb, "books", bookId, "orders");
        const result = await getDocs(collectionRef);
        return result;
    };

    const isLoggedin = user ? true:false;
    
    return(
        <firebaseContext.Provider value={{SignUpuserwithEmailandPassword , isLoggedin , SignInwithEmailandPassword , user , FirebaseAuth , SignInwithGoogle , handleCreateNewListing , listAllBooks , getBookById , placeOrder , fetchMyBooks , getOrders}}>
            {props.children}
        </firebaseContext.Provider>
    )
}
