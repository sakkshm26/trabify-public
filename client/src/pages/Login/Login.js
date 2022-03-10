import React, { useContext, useEffect } from 'react';
import './Login.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import AuthContext from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {

    const {user, loginUser} = useContext(AuthContext);

    const history = useNavigate()

    useEffect(() => {
        if(user){
            history("/");
        }
    }, [])

    return (
        <div className='login'>
            <Typography variant="h4" component="h4">Log In</Typography>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                    display: "flex",
                    flexDirection: "column",
                    width: {xs:"90%",sm:"70%",md:"35%"}
                }}
                Validate
                autoComplete="off"
                className='form'
                onSubmit={loginUser}
            >
                <TextField required name="email" id="register-email" label="Email" />
                <TextField required name="password" id="register-password" label="Password" type="password" />
                <Button variant="contained" type="submit">Log In</Button>
                <NavLink to='/register'><Typography>Don't have an account?</Typography></NavLink>
            </Box>
        </div>
    )
}

export default Login
