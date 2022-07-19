import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ROUTE_PATH } from '../../constants';
import Header from '../../components/Header';
import styles from './styles.module.scss';

const Page1 = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const goParamsPage = () => {
        navigate(`${ROUTE_PATH.page_with_params}/user-id-123`);
    };

    return (
        <div className={styles.container}>
            <Header />
            <p>This is page 1</p>
            <p>current pathname: {pathname}</p>
            <button onClick={goParamsPage}>Navigate with Params</button>
        </div>
    );
};

export default Page1;
