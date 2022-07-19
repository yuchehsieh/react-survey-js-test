/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/modern.min.css';

import { ROUTE_PATH } from '../../constants';
import Header from '../../components/Header';
import styles from './styles.module.scss';

StylesManager.applyTheme('modern');

const sixSurveyJson = {
    elements: [
        {
            name: 'firstName',
            title: 'Enter your first name:',
            type: 'text',
        },
        {
            name: 'lastName',
            title: 'Enter your last name:',
            type: 'text',
        },
    ],
};

const survey2Json = {
    elements: [
        {
            name: 'gender',
            title: 'Select your gender',
            type: 'text',
        },
        {
            name: 'age',
            title: 'Enter your age',
            type: 'text',
        },
    ],
};

const survey = () => {
    const navigate = useNavigate();
    const params = useParams();
    const chooseSurveyJson = () => {
        let surveyJson = {};
        if (params.surveyName === '六分鐘呼吸測驗') {
            surveyJson = sixSurveyJson;
        }
        if (params.surveyName === 'survey2') {
            surveyJson = survey2Json;
        }
        return surveyJson;
    };

    const survey = new Model(chooseSurveyJson());

    survey.focusFirstQuestionAutomatic = false;
    survey.completeText = '儲存並返回';

    const alertResults = (sender) => {
        const results = sender.data;
        console.log(results);
        goHome({
            ...results,
            surveyName: params.surveyName,
            surveyCompleted: true,
        });
    };

    survey.onComplete.add(alertResults);

    const goHome = (state) => {
        navigate(ROUTE_PATH.home, { state: state });
    };

    return (
        <div className={styles.container}>
            <Header />
            <Survey model={survey} />
        </div>
    );
};

export default survey;
