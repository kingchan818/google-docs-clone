import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/action/userAction';
import styled from 'styled-components';
import { TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';

export default function Register() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [click, setClick] = useState(false);

    const { detail, error } = useSelector((state) => state.user);

    const submitFrom = (e) => {
        e.preventDefault();

        dispatch(register(username, email, password, password1));

        console.log(error, detail);
    };

    const showPassword = (e) => {
        setClick(!click);
        click
            ? (document.getElementById('confirmed_password').type = 'password')
            : (document.getElementById('confirmed_password').type = 'text');
    };

    return (
        <form onSubmit={(e) => submitFrom(e)}>
            <TextField
                id="standard-basic"
                label="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <TextField
                id="standard-basic"
                label="Username"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <TextField
                id="standard-basic"
                type="password"
                label="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <TextField
                id="confirmed_password"
                type="password"
                label="Confirm Password"
                onChange={(e) => {
                    setPassword1(e.target.value);
                }}
            />
            <FormControlLabel
                value="top"
                control={<Checkbox color="primary" />}
                label="show password "
                labelPlacement="start"
                onClick={(e) => showPassword(e)}
            />
            <Button type="submit" variant="contained" color="default">
                Submit
            </Button>
        </form>
    );
}
