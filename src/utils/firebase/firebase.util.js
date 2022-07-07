import {initializeApp} from  'firebase/app';
import {getAuth, 
        signInWithRedirect, 
        signInWithPopup,
        GoogleAuthProvider,
        signOut,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword} //if u dont import this method in your sign-up-form.component your code will not work!!!
        from 'firebase/auth';
import {getFirestore,
        doc,
        getDoc,
        setDoc,
        collection,
        writeBatch,
        query,
        getDocs
        } from 'firebase/firestore';       
        

const firebaseConfig = {
    apiKey: "AIzaSyB0a9zaxWuUWkp4S3PPWXNezKRovkAYOHw",
    authDomain: "crwn-clothing-db-6726f.firebaseapp.com",
    projectId: "crwn-clothing-db-6726f",
    storageBucket: "crwn-clothing-db-6726f.appspot.com",
    messagingSenderId: "142651524122",
    appId: "1:142651524122:web:392f4bf580433da9613da3"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();  //google provider

  provider.setCustomParameters({
      prompt : "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) =>{
        const  collectionRef = collection(db, collectionKey);
        const batch = writeBatch(db);
        objectsToAdd.forEach((object) =>{
            const docRef = doc(collectionRef, object.title.toLowerCase());
            batch.set(docRef,object);
        });
        await batch.commit();
        console.log('done');
  };


  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
      return categoryMap;
  }
  

  export const createUserDocumentFromAuth  = async (userAuth, additionalInformation = {}) => {
      
      if(!userAuth) return;

      const userDocRef = doc(db, 'users', userAuth.uid);
      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());

      if(!userSnapshot.exists()){
          const { displayName, email} = userAuth;
          const createdAt = new Date();
        
          try{
              await setDoc(userDocRef,{
                  displayName,
                  email,
                  createdAt,
                  ...additionalInformation
              });

          }catch(error){
              console.log('error creating the user', error.message);
          }
      }
      return userDocRef
  };
  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
      if(!email || !password) return;

      return await createUserWithEmailAndPassword(auth, email, password)
  };

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener =  (callback) =>  {

    for(var i=callback; i<1; i++){
    onAuthStateChangedListener(auth, callback);
    }

}


 
