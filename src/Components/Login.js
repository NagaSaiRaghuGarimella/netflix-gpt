import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidate } from '../Utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth } from '../Utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux-store/userSlice';
import { provider } from '../Utils/firebase';




const Login = () => {
    const [isSignInForm, setSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setSignInForm(!isSignInForm);
    }
    const handleButtonClick = () => {
        //validate the form data
        const message = checkValidate(email.current.value, password.current.value);
        setErrorMessage(message);

        //sign in/ sign up
        if (message === null) {
            if (!isSignInForm) {
                createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        updateProfile(user, {
                            displayName: name.current.value, photoURL: "https://media.licdn.com/dms/image/C5603AQGru8ysAQlXJg/profile-displayphoto-shrink_100_100/0/1668098308327?e=1699488000&v=beta&t=jpHOBPD4P4amLzD4kCGfrZuOvKMBoAAwI0Uhxyki_sI"
                        }).then(() => {
                            const { uid, email, displayName, photoURL } = auth.currentUser;//updated user
                            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                        }).catch((error) => {
                            setErrorMessage(error.message);
                        });
                    })
                    .catch(() => {
                        setErrorMessage("User already registered");
                    }
                    );
            }
            else {
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                    })
                    .catch(() => {
                        setErrorMessage("User not exists please enter correct email and password");
                    }
                    );

            }
        }
    }

    const handleSignUpGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                navigate("/browse");

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage)
            });
    }
    return (
        <div>
            <Header></Header>
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="netflixlogo" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (<><input ref={name} type="text" placeholder='Full Name' className='p-4 my-2 w-full bg-gray-700' />
                    <input type="text" placeholder='Mobile Number' className='p-4 my-2 w-full bg-gray-700' /></>)}
                <input ref={email} type="text" placeholder='Email Address' className='p-4 my-2 w-full bg-gray-700' />
                <input ref={password} type="password" placeholder='Password' className='p-4 my-2 w-full bg-gray-700' />
                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer hover:underline' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up " : "Already registered? Sign In"}</p>
                {!isSignInForm && <p className='py-4 cursor-pointer hover:underline' onClick={handleSignUpGoogle}>Sign Up with Google</p>}
            </form>
        </div>
    )
}

export default Login