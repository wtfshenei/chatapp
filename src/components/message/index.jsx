import React, {useContext, useEffect, useRef} from 'react';
import {AuthContext} from "../../context/authContext.jsx";
import {ChatContext} from "../../context/chatContext.jsx";

const Index = ({ message }) => {
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message]);

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
           <div className={"message-info"}>
               <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt={message.senderId === currentUser.uid ? `Avatar of ${currentUser.displayName}` : `Avatar of ${data.user.displayName}`} />
               <span>...</span>
           </div>
            <div className={"message-content"}>
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt={'Image uploaded'}/>}
            </div>
        </div>
    );
};

export default Index;