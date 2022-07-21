/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
// import 'survey-core/modern.min.css';

import { ROUTE_PATH } from '../../constants';
import Header from '../../components/Header';
import styles from './styles.module.scss';

import SixSurveyJson from './sixSurvey.json';
import 'survey-core/defaultV2.css';
StylesManager.applyTheme('defaultV2');

// const sixSurveyJson = {
//     elements: [
//         {
//             name: 'firstName',
//             title: 'Enter your first name:',
//             type: 'text',
//         },
//         {
//             name: 'lastName',
//             title: 'Enter your last name:',
//             type: 'text',
//         },
//     ],
// };

const sixSurveyJson = SixSurveyJson;

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
    // const navigate = useNavigate();
    // const params = useParams();

    // survey control
    const [surveyModalVisible, setSurveyModalVisible] = useState(false);
    const [curSurveyName, setCurSurveyName] = useState();
    const [survey, setSurvey] = useState(new Model(sixSurveyJson));

    // survey data
    const [sixSurveyData, setSixSurveyData] = useState(false);
    const [survey2SurveyData, setSurvey2SurveyData] = useState(false);

    // survey UI related!!
    survey.focusFirstQuestionAutomatic = false;
    survey.showNavigationButtons = false;
    survey.showCompletedPage = false;

    // survey METHODS
    const saveResults = (sender) => {
        const results = sender.data;

        console.log(sender);

        if (curSurveyName === '六分鐘呼吸測驗') {
            setSixSurveyData({ ...results, surveyCompleted: true });
        }
        if (curSurveyName === 'survey2') {
            setSurvey2SurveyData({ ...results, surveyCompleted: true });
        }
    };
    survey.onComplete.add(saveResults);

    const openSurveyModal = (surveyName) => {
        if (surveyName === '六分鐘呼吸測驗') {
            let survey = new Model(sixSurveyJson);

            // 1. 填入表單預設值
            // 2. 檢視問卷模式
            // *** TODO: // 之後改成:
            // ***       // 最後成績送出前 都可以進行問卷的修改
            // ***       // 並加上提示: 送出後，問卷答案便無法修改的字樣
            if (sixSurveyData) {
                survey.data = sixSurveyData;
                // survey.mode = 'display'; // 這個打開後，僅供檢視
            }
            setSurvey(survey);
        }
        if (surveyName === 'survey2') {
            let survey = new Model(survey2Json);

            if (survey2Json) {
                survey.data = survey2SurveyData;
            }
            setSurvey(survey);
        }

        setCurSurveyName(surveyName);
        setSurveyModalVisible(true);
    };

    const onOKSurvey = async () => {
        let error = survey.hasErrors();
        if (error) {
            return;
        }
        survey.doComplete();
        setSurveyModalVisible(false);
    };

    const onCancelSurvey = () => {
        setSurveyModalVisible(false);
    };

    const renderSixMinutesResult = () => {
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
    const renderSurvey2Result = () => {
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
        <div className={styles.container} id="surveyContainer">
            <Header />
            <button onClick={() => openSurveyModal('六分鐘呼吸測驗')}>
                進行 六分鐘呼吸測驗
            </button>
            <button onClick={() => openSurveyModal('survey2')}>
                進行 survey2
            </button>
            <Modal
                width={'70vw'}
                className="surveyModalStyle" // 如果要覆寫 style 要這樣做
                title={curSurveyName}
                visible={surveyModalVisible}
                onOk={onOKSurvey}
                onCancel={onCancelSurvey}
                destroyOnClose
                okText="送出儲存"
            >
                <Survey id="surveyContainer" model={survey} />
            </Modal>
            {renderSixMinutesResult()}
            {renderSurvey2Result()}
        </div>
    );
};

export default survey;
