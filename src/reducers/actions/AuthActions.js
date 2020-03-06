import { SET_AUTH } from "../constants/AuthConstants";

/**********
 User Login 
 **********/
export const postLogin = async (email, password, dispatch) => {
  try {
    // Check for any empty fields
    if (!email) {
      const error = new Error();
      error.message = "Email can't be empty";

      throw error;
    }

    if (!password) {
      const error = new Error();
      error.message = "Please enter in your password";

      throw error;
    }

    // Make api call
    const login = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const loginData = await login.json();

    // Check for any errors
    if (loginData.status !== 200) {
      const error = new Error();
      error.message = loginData.message;

      throw error;
    }

    // Continue if there are no errors

    // Set localstorage with token and userID

    localStorage.setItem("userId", loginData.user._id);

    localStorage.setItem("token", loginData.token);

    dispatch({
      type: SET_AUTH,
      payload: {
        isAuth: true,
        token: loginData.token,
        user: loginData.user
      }
    });

    return loginData;
  } catch (err) {
    return err;
  }
};

export const verifyCreds = async (token, userId, dispatch) => {
  try {
    const verify = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/check?token=${token}&userId=${userId}`
    );

    const verifyData = await verify.json();

    if (verifyData.status !== 200) {
      const error = new Error();
      error.message = verifyData.message;

      throw error;
    }

    // Send dispatch for auth
    dispatch({
      type: SET_AUTH,
      payload: {
        isAuth: true,
        token,
        user: verifyData.user
      }
    });
  } catch (err) {
    return err;
  }
};
