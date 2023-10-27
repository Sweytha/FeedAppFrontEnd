import React, { useState } from "react";

import { useCookies } from 'react-cookie';

//create a context object
const AppContext = React.createContext();


//functional component
const AppContextProvider = ({ children }) => {

    //setCookie function can be used to update the value of the "appToken" cookie.
    //removeCookie function can be used to delete the "appToken" cookie from the browser.
    const [cookies, setCookie, removeCookie] = useCookies(["appToken"]);
    const [userSessionData, setUserSessionData] = useState(undefined);

    //function which saves the token into cookies "appToken"=cookieName, value=token
    const setSession = (token) => {
        setCookie("appToken", token, {
            path: "/",
            maxAge: 900, //15minutes
        });
    };

    //function allows us to retrieve the value of the token from the cookie by using cookies.appToken
    const getSession = () => {
        const token = cookies.appToken || null;
        return token;
    };

    //setUserSessionData function is used to update the value of the userSessionData state variable to the value of the userData argument.
    const setUserData = (userData) => setUserSessionData(userData);

    //function returns the current value of the userSessionData state variable.
    const getUserData = () => userSessionData;

    //logout function which is being called when the user clicks on the logout button
    const logout = () => {
        removeCookie("appToken", { path: "/" });
        setUserData(undefined);
    };

    return (
        <AppContext.Provider value={{setSession,getSession,setUserData,getUserData,logout}}>
            {/* Provider make values available to children*/}
            {children}
        </AppContext.Provider>
    )
}

export { AppContext };
export default AppContextProvider;