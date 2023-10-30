

import React, { useEffect, useContext } from "react";
//useNavigate hook for react-router-dom
import { useNavigate } from "react-router-dom";
//UpdatePublicProfile is our custom component that provides a form for updating the public profile
import UpdatePublicProfile from "../../components/UpdatePublicProfile";
import { AppContext } from "../../context/applicationContext";


const CompleteProfile = () => {

  const navigate = useNavigate();
  //call the AppContext object using useContext() hook
  const appContext = useContext(AppContext);
  //call getuserData
  const userData = appContext.getUserData();

  useEffect(() => {
    document.title = "Complete your profile | Feed App";
  }, []);

  //if the user profile is not updated , ask them to update the profile
  // if the user profile is updated , navigate them to dashboard route 
  useEffect(() => {
    if (userData && userData.profile) {
      navigate("/app/dashboard");
    }
  }, [userData]);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-1 gap-6 my-12 md:mx-12 w-2xl container px-2 mx-auto">
      {/* render the update public page to ask the user to update profile details */}
      <UpdatePublicProfile />
    </main>
  )
}

export default CompleteProfile