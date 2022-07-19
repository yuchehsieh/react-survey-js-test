/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header';

import styles from './styles.module.scss';

const Home = () => {
    const location = useLocation();
    const [sixSurveyData, setSixSurveyData] = useState(false);
    const [survey2SurveyData, setSurvey2SurveyData] = useState(false);

    useEffect(() => {
        if (
            location.state?.surveyName === '六分鐘呼吸測驗' &&
            location.state?.surveyCompleted
        ) {
            setSixSurveyData({ ...location.state });
        }
        if (
            location.state?.surveyName === 'survey2' &&
            location.state?.surveyCompleted
        ) {
            setSurvey2SurveyData({ ...location.state });
        }
    }, [location.state]);

    console.log(location.state);

    const renderSixMinutes = () => {
        if (!sixSurveyData?.surveyCompleted) {
            return null;
        }

        return (
            <div>
                已完成 六分鐘呼吸測驗
                <p>FirstName: {sixSurveyData.firstName}</p>
                <p>LastName: {sixSurveyData.lastName}</p>
            </div>
        );
    };

    const renderSurvey2 = () => {
        if (!survey2SurveyData?.surveyCompleted) {
            return null;
        }

        return (
            <div>
                已完成 第二樣問卷
                <p>Gender: {survey2SurveyData.gender}</p>
                <p>Age: {survey2SurveyData.age}</p>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <Header />
            This is Home page
            {renderSixMinutes()}
            {renderSurvey2()}
        </div>
    );
};

export default Home;
