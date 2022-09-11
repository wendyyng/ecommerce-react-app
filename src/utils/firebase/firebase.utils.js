import { initializeApp } from 'firebase/app'; 
// create app instance based on config
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC1W-YqFV3_NARBIPV2ls_xIQln5pBsVbM",
    authDomain: "ecommerce-react-app-f6b8d.firebaseapp.com",
    projectId: "ecommerce-react-app-f6b8d",
    storageBucket: "ecommerce-react-app-f6b8d.appspot.com",
    messagingSenderId: "495070703755",
    appId: "1:495070703755:web:2d81f6280c1533695ee48e"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)    
        }
    }

    return userDocRef;
  }