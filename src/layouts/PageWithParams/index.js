import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { ROUTE_PATH } from '../../constants';
import Header from '../../components/Header';
import styles from './styles.module.scss';

const PageWithParams = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const params = useParams();

    const goBack = () => {
        navigate(ROUTE_PATH.page1);
        // equal to:
        // navigate(-1);
    };

    return (
        <div className={styles.container}>
            <Header />
            <p>This page has params: {JSON.stringify(params)}</p>
            <p>current pathname: {pathname}</p>
            <button onClick={goBack}>Navigate(-1) to page 1</button>
        </div>
    );
};

export default PageWithParams;
