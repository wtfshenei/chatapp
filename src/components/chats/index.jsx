import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/authContext.jsx";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../assets/firebase/firebase.js";
import {ChatContext} from "../../context/chatContext.jsx";

const Index = () => {
    const [chats, setChats] = useState([])

    const {currentUser} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data())
            })

            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({type: "CHANGE_USER", payload: u})
    }

    return (
        <div className={'chats'}>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div className={"user-chat"} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img
                        src={chat[1].userInfo.photoURL}
                        alt={`Avatar of ${chat[1].userInfo.displayName}`}/>
                    <div className={"user-chat-info"}>
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Index;