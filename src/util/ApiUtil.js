import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

//defines a function called frameToken that takes in a single argument token and returns a string in the format "Bearer [token]".
const frameToken = (token) => `Bearer ${token}`;

const frameResponse = (
    reqStatus = 0,
    reqPayLoad = "Invalid request. Please try again later."
) => {
    return {
        status: reqStatus,
        payLoad: reqPayLoad,
    };
};

export const registerApi = async (username, password, emailId, firstName, lastName, phone) => {

    let response = frameResponse();

    try {
        //sign up API from backend
        const url = `${API_BASE_URL}/user/signup`;
        //axios makes a post request to the sign up API with request body 
        const apiResponse = await axios.post(url, { username, password, emailId, firstName, lastName, phone });
        if (apiResponse.status === 200) {
            response = frameResponse(1);
        }

    }
    catch (err) {
        if (err.response) {
            response = frameResponse(0, err.response.data.message);
        }
        console.log(err);
    }
    finally {
        return response;
    }
}


export const verifyEmailApi = async (token) => {
    let response = frameResponse();
    try {
        const url = `${API_BASE_URL}/user/verify/email`;
        const apiResponse = await axios.get(url, {
            headers: { Authorization: frameToken(token) },
        });
        if (apiResponse.status === 200) {
            response = frameResponse(1, apiResponse.data);
        }
    } catch (err) {
        if (err.response) {
            response = frameResponse(0, err.response.data.message);
        }
        console.log(err);
    } finally {
        return response;
    }
};


export const loginApi = async (username, password) => {
    let response = frameResponse();

    try {
        const url = `${API_BASE_URL}/user/login`;
        const apiResponse = await axios.post(url, { username, password });
        if (apiResponse.status === 200) {
            //if the login is sucessful , get the user Data and token from the response 
            const payLoad = {
                userData: apiResponse.data,
                token: apiResponse.headers.authorization,
            };
            response = frameResponse(1, payLoad);
        }
    } catch (err) {
        if (err.response) {
            response = frameResponse(0, err.response.data.message);
        }
        console.log(err);
    } finally {
        return response;
    }
};

//this is calling the forgotPasswordAPI from the backend 
export const forgotPasswordApi = async (email) => {
    let response = frameResponse();

    try {
        //email is passed here as a path variable 
        const url = `${API_BASE_URL}/user/reset/${email}`;
        //use axios to create a get request and pass the url to it
        const apiResponse = await axios.get(url);
        //if the response is 200 OK then set the status code of frameResponse to 1
        if (apiResponse.status === 200) {
            response = frameResponse(1);
        }
    } catch (err) {
        if (err.response) {
            response = frameResponse(0, err.response.data.message);
        }
        console.log(err);
    } finally {
        return response;
    }

};

//calls the reset password API from the backend 
export const resetPasswordApi = async (token, password) => {

    let response = frameResponse();
    try {
        //call the API from the backend 
        const url = `${API_BASE_URL}/user/reset`;
        //do a post using axios and pass the password as a request body
        //passing the token to the header of the request
        const apiResponse = await axios.post(
            url,
            {
                password,
            },
            { headers: { Authorization: frameToken(token) } }
        );
        if (apiResponse.status === 200) {
            response = frameResponse(1);
        }
    } catch (err) {
        if (err.response) {
            response = frameResponse(0, err.response.data.message);
        }
        console.log(err);
    } finally {
        return response;
    }


};