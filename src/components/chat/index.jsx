import React from 'react';
import Camera from '../../assets/img/cam.png'
import AddFriend from '../../assets/img/add.png'
import More from '../../assets/img/more.png'
import Messages from "../messages/index.jsx";
import Input from "../input/input.jsx";

const Index = () => {
    return (
        <div className={'chat'}>
           <div className={"chat-info"}>
               <span>Kbabz</span>
               <div className={"chat-icons"}>
                   <img src={Camera} alt={'Camera'} />
                   <img src={AddFriend} alt={'Add Friend'} />
                   <img src={More} alt={'More'} />
               </div>
           </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Index;