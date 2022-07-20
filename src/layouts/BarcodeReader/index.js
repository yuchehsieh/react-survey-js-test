/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

import { ROUTE_PATH } from '../../constants';
import Header from '../../components/Header';
import styles from './styles.module.scss';

const BarcodeReader = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [data, setData] = useState('Not Found');
    const [torchOn, setTorchOn] = useState(false);

    const goParamsPage = () => {
        navigate(`${ROUTE_PATH.page_with_params}/user-id-123`);
    };

    return (
        <>
            <BarcodeScannerComponent
                width={500}
                height={500}
                torch={torchOn}
                onUpdate={(err, result) => {
                    if (result) setData(result.text);
                    else setData('Not Found');
                }}
            />
            <p>{data}</p>
            <button onClick={() => setTorchOn(!torchOn)}>
                Switch Torch {torchOn ? 'Off' : 'On'}
            </button>
        </>
    );
};

export default BarcodeReader;
