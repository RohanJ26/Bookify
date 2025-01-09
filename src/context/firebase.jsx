import React from "react";
import { createContext,useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

    const SignUpuserwithEmailandPassword = (email,password)=>{
        createUserWithEmailAndPassword(FirebaseAuth,email,password);
    }

    const SignInwithEmailandPassword = (email,password)=>{
        signInWithEmailAndPassword(FirebaseAuth,email,password);
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

    const isLoggedin = user ? true:false;
    
    return(
        <firebaseContext.Provider value={{SignUpuserwithEmailandPassword , isLoggedin , SignInwithEmailandPassword , user , FirebaseAuth , SignInwithGoogle , handleCreateNewListing}}>
            {props.children}
        </firebaseContext.Provider>
    )
}
