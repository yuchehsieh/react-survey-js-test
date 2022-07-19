import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ROUTE_PATH, ROLES } from '../constants/';

import HomePage from '../layouts/Home';
import Page1 from '../layouts/Page1';
import PageWithParams from '../layouts/PageWithParams';
import ProtectedRoutes from './ProtectedRoutes';
import SignIn from '../layouts/SignIn';
import AdminDashboard from '../layouts/AdminDashboard';
import EditorProduct from '../layouts/EditorProduct';
import Missing from '../layouts/Missing';
import Unauthorized from '../layouts/Unauthorized';
import Survey from '../layouts/Survey';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTE_PATH.home} element={<HomePage />} />
            <Route path={ROUTE_PATH.page1} element={<Page1 />} />
            <Route
                path={`${ROUTE_PATH.survey}/:surveyName`}
                element={<Survey />}
            />
            <Route
                path={`${ROUTE_PATH.page_with_params}/:id`}
                element={<PageWithParams />}
            />
            <Route path={ROUTE_PATH.sign_in} element={<SignIn />} />
            <Route path={ROUTE_PATH.unauthorized} element={<Unauthorized />} />

            {/* only Editor, Admin can visit */}
            <Route
                element={
                    <ProtectedRoutes
                        allowedRoles={[ROLES.Editor, ROLES.Admin]}
                    />
                }
            >
                <Route
                    path={`${ROUTE_PATH.editor_product}/:productId`}
                    element={<EditorProduct />}
                />
            </Route>

            {/* only Admin can visit */}
            <Route element={<ProtectedRoutes allowedRoles={[ROLES.Admin]} />}>
                <Route
                    path={ROUTE_PATH.admin_dashbaord}
                    element={<AdminDashboard />}
                />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
        </Routes>
    );
};

export default AppRoutes;
