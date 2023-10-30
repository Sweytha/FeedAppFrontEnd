import React, { useState, useEffect, useContext } from "react";
import {
    Route,
    Routes,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";

import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import VerifyEmail from "../pages/User/VerifyEmail";
import ForgotPassword from "../pages/User/ForgotPassword";
import ResetPassword from "../pages/User/ResetPassword";
import Wrapper from "../components/Wrapper";
import NavBar from "../components/NavBar";

import { AppContext } from "../context/applicationContext";
import LoadingIndicator from "../components/LoadingIndicator";

import { sessionApi } from "../util/ApiUtil";
import Dashboard from "../pages/App/Dashboard";
import Profile from "../pages/App/Profile";
import CompleteProfile from "../pages/App/CompleteProfile";
import MyFeeds from "../pages/App/MyFeeds";

const AppRoutes = () => {

    //declare state variables using hooks
    const navigate = useNavigate(); //name spacing to make use of the useNavigate() hook
    const location = useLocation();//name spacing to make use of the useLocation() hook

    const appContext = useContext(AppContext); //namespacing to make use of AppContext object
    const token = appContext.getSession(); //call the getSession() function of the appContext
    const userData = appContext.getUserData(); //call the getUserData() functon of the appContext

    const [isAuthenticated, setIsAuthenticated] = useState(null); //check the authentication status to route the user to protected routes

    const pageTitles = {
        "/app/dashboard": "Dashboard",
        "/app/profile": "Profile",
        "/app/myFeeds": "My Feeds",
    };

    const getSession = async () => {
        const apiResponse = await sessionApi(token);
        if (apiResponse.status === 1) {
            appContext.setUserData(apiResponse.payLoad);
        }
    };

    useEffect(() => {
        if (token && !userData) {
            getSession();
        }
    }, []);

    useEffect(() => {
        if (!userData && !token) {
            setIsAuthenticated(false);
        }

        if (userData) {
            setIsAuthenticated(true);
            //if the user profile is not complete profile page to ask the user to complete his profile
            if (!userData.profile) {
                navigate("/app/completeProfile");
            }
        }
    }, [userData]);
    //if the user is not authenticated (has not logged in , no taken and no userData)
    if (isAuthenticated === false) {

        return (
            <Routes>
                <Route exact path="/user/login" element={<Login />} />
                <Route exact path="/user/register" element={<Register />} />
                <Route exact path="/user/verifyEmail" element={<VerifyEmail />} />
                <Route exact path="/user/forgotPassword" element={<ForgotPassword />} />
                <Route exact path="/user/resetPassword" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/user/login" replace />} />
            </Routes>
        )
    }
    if (isAuthenticated === true) {
        return (
            <Wrapper>
                {/* If the user profile is not completed , we route them to completeProfile page  */}
                {userData && userData.profile && (
                    <NavBar pageTitle={pageTitles[location.pathname]} />
                )}
                {/* These are protected routes */}
                <Routes>
                    <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                    <Route exact path="/app/dashboard" element={<Dashboard />} />
                    <Route exact path="/app/myFeeds" element={<MyFeeds />} />
                    <Route exact path="/app/profile" element={<Profile />} />
                    <Route
                        exact
                        path="/app/completeProfile"
                        element={<CompleteProfile />}
                    />
                </Routes>
            </Wrapper>
        );
    }
};

export default AppRoutes;