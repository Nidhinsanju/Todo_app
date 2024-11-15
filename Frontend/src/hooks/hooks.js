import axios from "axios";
import { baseURL } from "../URL";

function HandleError(err) {
  if (err.response) {
    // If there is a response from the server (status code out of the range of 2xx)
    return {
      success: false,
      message:
        err.response.data.message || "An error occurred while logging in",
      statusCode: err.response.status,
    };
  } else if (err.request) {
    // If no response was received from the server
    return {
      success: false,
      message: "No response from the server, please try again later",
    };
  } else {
    // If there was an error setting up the request
    return {
      success: false,
      message: err.message || "An unknown error occurred",
    };
  }
}

const token = localStorage.getItem("token");
//API for Login USER
export const Login = async (name, password) => {
  try {
    const response = await axios.post(
      baseURL + "/user-login/",
      {
        email: name,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response; // Successfully logged in, return the response.
  } catch (err) {
    const result = HandleError(err);
    return result; // Error occurred, return the error message.
    // Handle error gracefully
  }
};

//API for Register USER
export const SignUp = async (values) => {
  const { firstName, lastName, email, confirmPassword } = values;
  try {
    const response = await axios.post(
      baseURL + "/user-signup/",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response; // Successfully logged in, return the response.
  } catch (err) {
    const result = HandleError(err);
    return result; // Error occurred, return the error message.
    // Handle error gracefully
  }
};

export const SubmitTask = async (id, values) => {
  try {
    const response = axios.post(
      baseURL + "/add-task/",
      {
        id: id,
        TaskList: [values],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    const result = HandleError(err);
    return result; // Error occurred, return the error message.
    // Handle error gracefully
  }
};

export const getTaskList = async (id) => {
  const userID = parseInt(id);
  try {
    const response = await axios.post(
      baseURL + "/task-list/",
      {
        id: userID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    const result = HandleError(err);
    return result; // Error occurred, return the error message.
    // Handle error gracefully
  }
};
