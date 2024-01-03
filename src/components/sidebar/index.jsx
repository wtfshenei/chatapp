import React from 'react';
import Navbar from "../navbar/index.jsx";
import Searchbar from "../searchbar/index.jsx";
import Chats from "../chats/index.jsx";

const Index = () => {
    return (
        <div className={'sidebar'}>
            <Navbar />
            <Searchbar />
            <Chats />
        </div>
    );
};

export default Index;