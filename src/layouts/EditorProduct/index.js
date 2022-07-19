import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { ROUTE_PATH } from '../../constants';
import Header from '../../components/Header';
import styles from './styles.module.scss';

const AdminProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { pathname } = useLocation();

    const goDashboard = () => {
        navigate(ROUTE_PATH.admin_dashbaord);
    };

    return (
        <div className={styles.container}>
            <Header />
            <p>This is Admin Product Page</p>
            <p>This page has params: {JSON.stringify(params)}</p>
            <p>current pathname: {pathname}</p>
            <button onClick={goDashboard}>Navigate To Admin Dashboard</button>
        </div>
    );
};

export default AdminProduct;
