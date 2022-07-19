/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { StylesManager, Model } from 'survey-core';

import Header from '../../components/Header';
import { ROUTE_PATH } from '../../constants';

import styles from './styles.module.scss';

const Home = () => {
    const navigate = useNavigate();

    const goSurvey = () => {
        navigate(ROUTE_PATH.survey);
    };

    return (
        <div className={styles.container}>
            <Header />
            This is Home page
            <button onClick={goSurvey}>何不嘗試 做做問卷?</button>
        </div>
    );
};

export default Home;
