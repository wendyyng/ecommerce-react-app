import { initializeApp } from 'firebase/app'; 
// create app instance based on config
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    // FacebookAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
 } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC1W-YqFV3_NARBIPV2ls_xIQln5pBsVbM",
    authDomain: "ecommerce-react-app-f6b8d.firebaseapp.com",
    projectId: "ecommerce-react-app-f6b8d",
    storageBucket: "ecommerce-react-app-f6b8d.appspot.com",
    messagingSenderId: "495070703755",
    appId: "1:495070703755:web:2d81f6280c1533695ee48e"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    //Set batch for each objects
    objectsToAdd.forEach((object) => {
      //First get document reference, collectionRef - which db we're using
      // can also use object[field].toLowerCase()
      const docRef = doc(collectionRef, object.title.toLowerCase());
      //set location and set the value of the JSON object
      batch.set(docRef, object)      
    })
    await batch.commit();
    console.log('done') 
  }

  
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
    //arr of indivicual elements inside
    // const categoryMap = querySnapshot.docs
    // .reduce((acc, docSnapshot) => {
    //   const { title, items } = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;
    //   return acc;
    // }, {});

    // return categoryMap
  }

  export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    if (!userAuth) return
    
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
                createdAt,
                ...additionalInformation,
            })
        } catch (error) {
            console.log('error creating the user', error.message)    
        }
    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, passwsord) => {
    // if no email or password provided, return immediately
    if (!email || !passwsord) return
    
    return await createUserWithEmailAndPassword(auth, email, passwsord)
  }
  export const SignInAuthUserWithEmailAndPassword = async (email, passwsord) => {
    // if no email or password provided, return immediately
    if (!email || !passwsord) return
    
    return await signInWithEmailAndPassword(auth, email, passwsord)
  }

  export const signOutUser = async () => await signOut(auth);

  //call the callback when the state of auth singleton changes, eg. user signs in
  export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
  }