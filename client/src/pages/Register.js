import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/action/userAction';
import styled from 'styled-components';
import { TextField, Button, Checkbox, FormControlLabel, Container, Grid, makeStyles } from '@material-ui/core';

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
            <RegisterForm>
                <Grid container spacing="2" direction="column" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic"
                            label="Username"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic"
                            type="password"
                            label="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="confirmed_password"
                            type="password"
                            label="Confirm Password"
                            onChange={(e) => {
                                setPassword1(e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
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
            </RegisterForm>
        </form>
    );
}

const RegisterForm = styled.div`
    margin: 15rem auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;
