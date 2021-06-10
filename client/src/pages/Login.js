import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/action/userAction';

export default function Login() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const { detail } = useSelector((state) => state.user);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/auth/login', {
                email: email,
                password: password,
            });
            console.log(data);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="login-form">
            <form onSubmit={(e) => submitForm(e)}>
                <div className="email">
                    <label>email:</label>
                    <input
                        type="text"
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">password :</label>
                    <input
                        type="text"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
