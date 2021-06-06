import axios from 'axios';

export const login = (username, password) => async (dispatch, getSatae) => {
    try {
        const { headers } = await axios.post('user/login', {
            username: username,
            password: password,
        });
        console.log(headers);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: headers['x-auth-token'],
        });
        localStorage.setItem('user', JSON.stringify(getState().user));
    } catch (error) {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: error.message,
        });
    }
};

export const register = (username, email, password, password1) => async (dispatch, getState) => {
    try {
        const { headers } = await axios.post('user/login', {
            username: username,
            email: email,
            password: password,
            password1: password1,
        });
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: headers['x-auth-token'],
        });
        localStorage.setItem('user', JSON.stringify(getState().user));
    } catch (error) {
        dispatch({
            type: 'REGISTER_FAIL',
            payload: error.message,
        });
    }
};
