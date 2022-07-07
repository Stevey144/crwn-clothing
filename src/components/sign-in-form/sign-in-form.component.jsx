import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "../../store/user/user.selector";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

import {signInWithGooglePopup,
        createUserDocumentFromAuth,
        signInAuthUserWithEmailAndPassword, 
        } from "../../utils/firebase/firebase.util";

const defaultFormField = {
    email : '',
    password : ''
}

const SignInForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormField)
    const {email,password} = formFields;

    const setCurrentUser = useSelector(selectCurrentUser);


    const resetFormFields = () =>{
        setFormFields(defaultFormField);
    }

    
    const SignInWithGoogle = async () =>{
        const {user} = await signInWithGooglePopup();
          await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
             const {user} = await signInAuthUserWithEmailAndPassword(email,password);
                setCurrentUser(user); 
                resetFormFields();
            }
            catch(error){
                switch(error.code){
                    case 'auth/wrong-password':
                         alert('Incorrect password for email');
                         console.log(error);
                         break;

                    case 'auth/user-not-found':
                            alert('no user associated with this email');
                            break;

                         default:
                         console.log(error);
                }
            }

    };

    const handleChange = (event) => {
        const {name , value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required  onChange={handleChange} name='email' value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name='password' value={password} />
                <div className="buttons-container">
                <Button type="submit"> Sign In</Button>
                <Button type="button" buttonType='google' onClick={SignInWithGoogle}>Google Sign In</Button> 
                </div>
            </form>
        </div>
    )

}
export default SignInForm