import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/action/userAction';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import styled from 'styled-components';

export default function Login() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [click, setClick] = useState(false);

    const { detail } = useSelector((state) => state.user);

    const showPassword = (e) => {
        setClick(!click);
        click
            ? (document.getElementById('password').type = 'password')
            : (document.getElementById('password').type = 'text');
    };

    const submitForm = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        console.log(detail);
    };

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <LoginForm>
                <Grid container spacing="2" direction="column" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            type="password"
                            label="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Grid>
                    <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="show password "
                        labelPlacement="start"
                        onClick={(e) => showPassword(e)}
                    />

                    <Button type="submit" variant="contained" color="default" size="small">
                        Submit
                    </Button>
                </Grid>
            </LoginForm>
        </form>
    );
}
const LoginForm = styled.div`
    margin: 15rem;
`;
