import React from 'react';
import Sidebar from "../../components/sidebar/index.jsx";
import Chat from "../../components/chat/index.jsx";

const Index = () => {
    return (
        <div className={'homepage'}>
            <div className={"container"}>
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
};

export default Index;