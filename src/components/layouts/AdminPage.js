import React from 'react';
import Header from '../Header';
import ListBook from '../ListBook';
import config from '../../config';

const AdminPage = () => {
    return (
        <div>
            <Header adLogined={true} userLogined={false} to={config.route.admin}/>
            <ListBook adLogined={true} userLogined={false} />
        </div>
    );
};

export default AdminPage;