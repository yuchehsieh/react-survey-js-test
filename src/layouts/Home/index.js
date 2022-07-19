/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

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

const Home = () => {
    const location = useLocation();
    const [modalVisible, setModalVisible] = useState(false);

    const survey = new Model(sixSurveyJson);
    survey.focusFirstQuestionAutomatic = false;
    survey.showNavigationButtons = false;

    const alertResults = (sender) => {
        const results = sender.data;
        console.log(results);
    };

    survey.onComplete.add(alertResults);

    // const [sixSurveyData, setSixSurveyData] = useState(false);
    // const [survey2SurveyData, setSurvey2SurveyData] = useState(false);

    // useEffect(() => {
    //     if (
    //         location.state?.surveyName === '六分鐘呼吸測驗' &&
    //         location.state?.surveyCompleted
    //     ) {
    //         setSixSurveyData({ ...location.state });
    //     }
    //     if (
    //         location.state?.surveyName === 'survey2' &&
    //         location.state?.surveyCompleted
    //     ) {
    //         setSurvey2SurveyData({ ...location.state });
    //     }
    // }, [location.state]);

    // console.log(location.state);

    // const renderSixMinutes = () => {
    //     if (!sixSurveyData?.surveyCompleted) {
    //         return null;
    //     }

    //     return (
    //         <div>
    //             已完成 六分鐘呼吸測驗
    //             <p>FirstName: {sixSurveyData.firstName}</p>
    //             <p>LastName: {sixSurveyData.lastName}</p>
    //         </div>
    //     );
    // };

    // const renderSurvey2 = () => {
    //     if (!survey2SurveyData?.surveyCompleted) {
    //         return null;
    //     }

    //     return (
    //         <div>
    //             已完成 第二樣問卷
    //             <p>Gender: {survey2SurveyData.gender}</p>
    //             <p>Age: {survey2SurveyData.age}</p>
    //         </div>
    //     );
    // };

    const openSix = () => {
        setModalVisible(true);
    };

    const onOKSurvey = () => {
        setModalVisible(false);
        survey.doComplete();
    };

    const onCancelSurvey = () => {
        setModalVisible(false);
    };

    return (
        <div className={styles.container}>
            <Header />
            This is Home page
            <button onClick={openSix}>open 六分鐘呼吸測驗</button>
            {/* {renderSixMinutes()}
            {renderSurvey2()} */}
            <Modal
                title="六分鐘呼吸測驗"
                visible={modalVisible}
                onOk={onOKSurvey}
                // confirmLoading={loading}
                onCancel={onCancelSurvey}
                destroyOnClose
                okText="送出儲存"
            >
                <Survey model={survey} />
            </Modal>
        </div>
    );
};

export default Home;
