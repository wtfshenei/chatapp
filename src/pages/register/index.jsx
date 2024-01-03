import React, {useState} from 'react';
import AddAvatar from '../../assets/img/addAvatar.png'
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, db, storage} from "../../assets/firebase/firebase.js"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"

const Index = () => {
    const [err, setErr] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                    });
                }
            );
        } catch (err) {
            setErr(true)
        }
    }

    return (
        <div className={'form-container'}>
            <div className={'form-wrapper'}>
                <span className={'logo'}>FFT Chat</span>
                <span className={'title'}>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type={'text'} placeholder={'Display Name'}/>
                    <input type={'email'} placeholder={'Email'}/>
                    <input type={'password'} placeholder={'Password'}/>
                    <input type={'file'} id={'file'} style={{display: 'none'}}/>
                    <label htmlFor={'file'}>
                        <img src={AddAvatar} alt={'Ajouter un avatar'}/>
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You do have an account ? Login</p>
            </div>
        </div>
    );
};

export default Index;