import React, {useContext, useState} from 'react';
import SendImg from '../../assets/img/img.png'
import SendAttach from '../../assets/img/attach.png'
import {AuthContext} from "../../context/authContext.jsx";
import {ChatContext} from "../../context/chatContext.jsx";
import {updateDoc, doc, arrayUnion, Timestamp, serverTimestamp} from "firebase/firestore";
import {db, storage} from "../../assets/firebase/firebase.js";
import {v4 as uuid} from 'uuid'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

const Input = () => {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid())
            const uploadTask = uploadBytesResumable(storageRef, img)

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Handle progress updates
                },
                (error) => {
                    // Handle unsuccessful uploads
                    // setErr(true)
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            })
                        })
                    });
                }
            );
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text
            },
            [data.chatId + '.date']: serverTimestamp()
        })

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text
            },
            [data.chatId + '.date']: serverTimestamp()
        })

        setText('')
        setImg(null)
    }

    return (
        <div className={'input'}>
            <input type={'text'} placeholder={'Type something...'} onChange={e => setText(e.target.value)} value={text} />
            <div className={"send"}>
                <img src={SendAttach} alt={'Attach'}/>
                <input type={'file'} id={'file'} style={{display: 'none'}} onChange={e => setImg(e.target.files[0])}/>
                <label htmlFor={'file'}>
                    <img src={SendImg} alt={'Send Image'}/>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;