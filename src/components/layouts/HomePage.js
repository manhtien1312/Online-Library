import React from 'react';
import Header from '../Header';
import ListBook from '../ListBook';

const HomePage = () => {
    return (
        <div>
            <Header adLogined={false} userLogined={false}/>
            <ListBook adLogined={false} userLogined={true} />
        </div>
    );
};

export default HomePage;