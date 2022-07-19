import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ROUTE_PATH } from '../../constants';
import Header from '../../components/Header';
import styles from './styles.module.scss';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const goEditProduct = () => {
        navigate(`${ROUTE_PATH.editor_product}/prod-123-456`);
    };

    return (
        <div className={styles.container}>
            <Header />
            <p>This is Admin Dashboard</p>
            <p>current pathname: {pathname}</p>
            <button onClick={goEditProduct}>
                Navigate To Editor Product Page
            </button>
        </div>
    );
};

export default AdminDashboard;
