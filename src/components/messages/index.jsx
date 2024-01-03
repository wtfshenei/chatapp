import React, {useContext, useEffect, useState} from 'react';
import Message from "../message/index.jsx";
import {ChatContext} from "../../context/chatContext.jsx";
import {onSnapshot, doc} from "firebase/firestore";
import {db} from "../../assets/firebase/firebase.js";

const Index = () => {
    const [messages, setMessages] = useState([])

    const {data} = useContext(ChatContext)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub()
        }
    }, [data.chatId])

    return (
        <div className={'messages'}>
            {messages.map(m => (
                <Message key={m.id} message={m} />
            ))}
        </div>
    );
};

export default Index;