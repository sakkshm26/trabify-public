import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Register.css";
import { useState } from 'react';
import { Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Register = () => {

    const {user} = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('https://trabify.herokuapp.com/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': e.target.name.value,
                'email': e.target.email.value,
                'phone': e.target.phone.value,
                'password': e.target.password.value
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setErrors([]);
                if(data.name){
                    history("/");
                }
                else{
                    for(const element in data){
                        setErrors(prevState => ([...prevState,data[element][0]]))
                    }
                }
            })
            .catch((error) => {
                alert("Something went wrong")
            });
        history("/login");
    }

    useEffect(() => {
        if(user){
            history("/");
        }
    }, [])

    return (
        <div className='register'>
            <Typography variant="h4" component="h4">Register</Typography>
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
                onSubmit={(e) => handleSubmit(e)}
            >
                <TextField required name="name" id="register-name" label="Name"/>
                <TextField required name="email" id="register-email" label="Email" />
                <TextField name="phone" id="register-phone" label="Phone (Optional)" helperText="If you don't provide a phone number, you will be contacted through Email" />
                <TextField required name="password" id="register-password" label="Password" type="password" />
                <Button variant="contained" type="submit">Register</Button>
                <NavLink to='/login'><Typography>Already have an account?</Typography></NavLink>
                {errors.length>0 ? <div className='error'>{errors.map(error => <p>{error}</p>)}</div> : ""}
            </Box>
        </div>
    )
}

export default Register
