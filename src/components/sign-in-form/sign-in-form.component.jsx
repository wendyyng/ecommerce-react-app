import { useState, useContext } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, SignInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import '../button/button.component'
import Button from '../button/button.component'
import { UserContext } from '../../contexts/user.context'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInFrom = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;
    console.log(formFields)

    const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        //create user
        try {
            const { user } = await SignInAuthUserWithEmailAndPassword(email, password)
            console.log(user)
            setCurrentUser(user)
            resetFormFields();
        } catch(error){
            switch (error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break
                default:
                    console.log(error)
                
            }
            // if(error.code === "auth/wrong-password"){
            //     alert('incorrect password for email')
            // }
            console.log(error);
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // target is the input
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' type="button" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInFrom