import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

//as the actual value you want to access
export const UserContext = createContext({
    currentUser : null,
    setCurrentUser : () => null,

});

export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const value ={currentUser};
    // signOutUser();
    useEffect(() => {
            const unsubscribe = onAuthStateChangedListener((user) =>{
                if(user){
                    createUserDocumentFromAuth(user);
                    console.log(user);
                }
               setCurrentUser(user);
               
             });
             return unsubscribe;
      }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}