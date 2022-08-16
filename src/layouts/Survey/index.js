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
import COPDSurveyJson from './copdSurvey.json';
import SGRSurveyJson from './sgrSurvey.json';
import BorgScaleSurveyJson from './borgScaleSurvey.json';
import 'survey-core/defaultV2.css';
StylesManager.applyTheme('defaultV2');

const sixSurveyJson = SixSurveyJson;
const copdSurveyJson = COPDSurveyJson;
const sgrSurveyJson = SGRSurveyJson;
const borgScaleSurveyJson = BorgScaleSurveyJson;

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

const myCss = {
    text: {
        controlDisabled: 'survey-input-disabled',
    },
    rating: {
        selected: 'survey-rating-selected',
    },
    // radiogroup: {
    //     itemDisabled: 'survey-radiogroup-disable',
    // },
};

const survey = () => {
    // const navigate = useNavigate();
    // const params = useParams();

    // survey control
    const [surveyModalVisible, setSurveyModalVisible] = useState(false);
    const [curSurveyName, setCurSurveyName] = useState();
    const [survey, setSurvey] = useState(new Model(sixSurveyJson));

    // survey data
    const [sixSurveyData, setSixSurveyData] = useState({ question3: '123' });
    const [survey2SurveyData, setSurvey2SurveyData] = useState(false); // EXAMPLE
    const [copdSurveyData, setCopdSurveyData] = useState(false);
    const [sgrSurveyData, setSGRSurveyData] = useState({
        question3: 'Good',
        question5: 'item1',
        question6: 'item1',
        question14: { ['Row 1']: 'Column 2' },
    });
    const [borgScaleSurveyData, setBorgScaleSurveyData] = useState({
        question2: 'Zone3',
    });
    // 需要填上 患者ID 跟 日期的問卷:
    // 從 呼叫端傳入，並且設成 initial state
    // 記得把對應的欄位改為 readOnly: true

    // survey UI related!!
    survey.focusFirstQuestionAutomatic = false;
    survey.showNavigationButtons = false;
    survey.showCompletedPage = false;

    // survey METHODS
    const saveResults = (sender) => {
        const results = sender.data;

        console.log(sender.data);

        if (curSurveyName === '六分鐘呼吸測驗') {
            setSixSurveyData({ ...results, surveyCompleted: true });
        }
        if (curSurveyName === 'copd') {
            setCopdSurveyData({ ...results, surveyCompleted: true });
        }
        if (curSurveyName === 'sgr') {
            setSGRSurveyData({ ...results, surveyCompleted: true });
            console.log(results);
        }
        if (curSurveyName === 'borgScale') {
            setBorgScaleSurveyData({ ...results, surveyCompleted: true });
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
        if (surveyName === 'copd') {
            let survey = new Model(copdSurveyJson);

            if (copdSurveyData) {
                survey.data = copdSurveyData;
            }
            setSurvey(survey);
        }
        if (surveyName === 'sgr') {
            let survey = new Model(sgrSurveyJson);

            if (sgrSurveyData) {
                survey.data = sgrSurveyData;
            }
            setSurvey(survey);
        }
        if (surveyName === 'borgScale') {
            let survey = new Model(borgScaleSurveyJson);

            if (borgScaleSurveyData) {
                survey.data = borgScaleSurveyData;
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
                <p>{JSON.stringify(sixSurveyData)}</p>
            </div>
        );
    };
    const renderCopdResult = () => {
        if (!copdSurveyData?.surveyCompleted) {
            return null;
        }
        return (
            <div>
                已完成 COPD 測驗
                <p>{JSON.stringify(copdSurveyData)}</p>
            </div>
        );
    };
    const renderSgrResult = () => {
        if (!sgrSurveyData?.surveyCompleted) {
            return null;
        }
        return (
            <div>
                已完成 COPD 測驗
                <p>{JSON.stringify(sgrSurveyData)}</p>
            </div>
        );
    };
    const renderBorgScaleResult = () => {
        if (!borgScaleSurveyData?.surveyCompleted) {
            return null;
        }
        return (
            <div>
                已完成 Borg Scale 測驗
                <p>{JSON.stringify(borgScaleSurveyData)}</p>
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
            <button onClick={() => openSurveyModal('copd')}>
                進行 COPD 測驗
            </button>
            <button onClick={() => openSurveyModal('sgr')}>
                進行 SGR 測驗
            </button>
            <button onClick={() => openSurveyModal('borgScale')}>
                進行 Borg Scale 測驗
            </button>
            <button onClick={() => openSurveyModal('survey2')}>
                進行 survey2
            </button>
            <Modal
                width={'70vw'}
                className="surveyModalStyle" // 如果要覆寫 style 要這樣做
                visible={surveyModalVisible}
                onOk={onOKSurvey}
                onCancel={onCancelSurvey}
                destroyOnClose
                okText="送出儲存"
            >
                <Survey id="surveyContainer" model={survey} css={myCss} />
            </Modal>
            {renderSixMinutesResult()}
            {renderCopdResult()}
            {renderSgrResult()}
            {renderBorgScaleResult()}
            {renderSurvey2Result()}
        </div>
    );
};

export default survey;
