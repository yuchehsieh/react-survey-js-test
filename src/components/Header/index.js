import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '../../constants';

import styles from './styles.module.scss';

const Header = () => {
    return (
        <div className={styles.container}>
            <Link to={ROUTE_PATH.home}>Logo</Link>
            <Link to={`${ROUTE_PATH.survey}/六分鐘呼吸測驗`}>
                六分鐘呼吸測驗
            </Link>
            <Link to={`${ROUTE_PATH.survey}/survey2`}>Survey2</Link>
            <Link to={ROUTE_PATH.page1}>page1</Link>
            <Link to={ROUTE_PATH.sign_in}>sign in</Link>
        </div>
    );
};

export default Header;
