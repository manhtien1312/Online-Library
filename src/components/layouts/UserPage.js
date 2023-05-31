import React from 'react';
import Header from '../Header';
import ListBook from '../ListBook';

const UserPage = () => {
    return (
        <div>
            <Header adLogined={false} userLogined={true}/>
            <ListBook adLogined={false} userLogined={true} />
        </div>
    );
};

export default UserPage;