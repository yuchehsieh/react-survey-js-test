import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/modern.min.css';

import { ROUTE_PATH } from '../../constants';
import Header from '../../components/Header';
import styles from './styles.module.scss';

StylesManager.applyTheme('modern');

const surveyJson = {
    elements: [
        {
            name: 'FirstName',
            title: 'Enter your first name:',
            type: 'text',
        },
        {
            name: 'LastName',
            title: 'Enter your last name:',
            type: 'text',
        },
    ],
};

const survey = () => {
    const navigate = useNavigate();
    const survey = new Model(surveyJson);

    survey.focusFirstQuestionAutomatic = false;

    const alertResults = useCallback((sender) => {
        const results = JSON.stringify(sender.data);
        console.log(results);
    }, []);

    survey.onComplete.add(alertResults);

    const goHome = () => {
        navigate(`${ROUTE_PATH.home}`);
    };

    return (
        <div className={styles.container}>
            <Header />
            <p>This is survey page</p>
            <Survey model={survey} />
            <button onClick={goHome}>Navigate to home</button>
        </div>
    );
};

export default survey;
