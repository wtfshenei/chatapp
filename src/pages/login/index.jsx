import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../assets/firebase/firebase.js";

const Index = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await  signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            console.error(err)
            setErr(true)
        }
    }

    return (
        <div className={'form-container'}>
            <div className={'form-wrapper'}>
                <span className={'logo'}>FFT Chat</span>
                <span className={'title'}>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type={'email'} placeholder={'Email'} />
                    <input type={'password'} placeholder={'Password'} />
                    <button>Sign In</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You don't have an account ? <Link to={'/register'}>Register</Link></p>
            </div>
        </div>
    );
};

export default Index;