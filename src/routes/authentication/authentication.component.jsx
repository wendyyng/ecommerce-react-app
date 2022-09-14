import { useEffect, useState } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpFrom from '../../components/sign-up-form/sign-up-form.component';
import SignInFrom from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'

import {
    auth,
    signInWithGooglePopup,
    // signInWithGoogleRedirect,
    createUserDocumentFromAuth,
  } from '../../utils/firebase/firebase.utils';

  const defaultFormFields = {
    email: '',
    password: '',
}

  const Authentication = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;
    useEffect( () => {
        async function fetchData() {
            const response = await getRedirectResult(auth) 
            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        fetchData()
    }, []);

    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    };

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect()
    //     console.log({user});
    // }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // target is the input
        setFormFields({...formFields, [name]: value})
    }
  
    return (
      <div className="authentication-container">
        <SignInFrom />
        {/* <Button onClick={logGoogleUser}>Sign in with Google Popup</Button> */}
        {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        <SignUpFrom />
      </div>
    );
  };
  
  export default Authentication;