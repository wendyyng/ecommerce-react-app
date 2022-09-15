import { useState, useContext  } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import '../button/button.component'
import Button from '../button/button.component'
import { UserContext } from '../../contexts/user.context'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpFrom = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    //function getting rerun when user signs in because of userContext
    console.log('hit');

    const { setCurrentUser } = useContext(UserContext)
    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        //confirm passwords match
        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        //create user
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            console.log(user)

            setCurrentUser(user)
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else {
                console.log('User creation encountered an error', error)
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // target is the input
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>

            </form>
        </div>
    )
}

export default SignUpFrom