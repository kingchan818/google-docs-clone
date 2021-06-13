import axios from 'axios';
import jwt_decode from 'jwt-decode';
export const login = (email, password) => async (dispatch, getState) => {
    try {
        const { headers } = await axios.post('/api/auth/login', {
            email: email,
            password: password,
        });

        const decode = jwt_decode(headers['x-auth-token']);
        console.log(decode);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: decode,
        });
        localStorage.setItem('user', JSON.stringify(getState().user));
    } catch (error) {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: error.message,
        });
        console.log(error);
    }
};

export const register = (username, email, password, password1) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post('/api/auth/register', {
            username: username,
            email: email,
            password: password,
            password_confirmation: password1,
        });
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'REGISTER_FAIL',
            payload: error,
        });
    }
};
