import React, { useEffect, useState } from 'react';
import "./Sell.css";
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Sell = ({change,setChange}) => {

    const [session, setSession] = useState("2015-2016");
    const [sem, setSem] = useState(1);
    const [year, setYear] = useState(1);
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useNavigate();

    const handleSessionChange = e => {
        setSession(e.target.value);
    }

    const handleSemChange = e => {
        setSem(e.target.value);
        let value = e.target.value % 2 === 0 ? e.target.value / 2 : parseInt(e.target.value / 2 + 1)
        setYear(value);
    }

    const handlePriceChange = e => {
        let value = e.target.value;
        if (value > 1000) {
            return 0;
        }
        setPrice(value);
    }

    const handleSubmit = e => {
        setLoading(true);
        document.getElementById('main').classList.add('load');
        e.preventDefault();
        let token = localStorage.getItem('authTokens')
        let decoded;
        let url;
        if (token) {
            token = JSON.parse(token).access
            decoded = jwt_decode(token);
        }
        if (token) {
            // access = JSON.parse(access).access;
            url = `https://trabify.herokuapp.com/books/?access=${token}/`;
        }
        else {
            url = `https://trabify.herokuapp.com/books/`;
        }
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        let formData = new FormData();
        formData.append("name", e.target.bookName.value)
        formData.append("subject", e.target.subject.value)
        formData.append("session", session)
        formData.append("semester", sem)
        formData.append("year", year)
        formData.append("price", e.target.price.value)
        formData.append("user", decoded.user_id)
        if (e.target.image.files[0]) {
            formData.append("image", e.target.image.files[0])
        }

        axios.post(url, formData, config)
        // .then(response => console.log(response.data))
        // .catch(err => console.log(err))
        change===true ? setChange(false) : setChange(true);

        const interval = setInterval(() => {
            history("/list");
            clearInterval(interval);
        }, 2000);
    }

    return (
        <Box id='main'>
            {!loading ? <Box className='sell'>
                <Typography variant="h4" component="h4">Post your Book</Typography>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                        display: "flex",
                        flexDirection: "column",
                        width: { xs: "90%", sm: "70%", md: "35%" }
                    }}
                    Validate
                    autoComplete="off"
                    className='form'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <TextField required name="bookName" label="Name of Book" />
                    <TextField required name="subject" label="Subject" />
                    <FormControl width="90%">
                        <InputLabel>Session</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={session}
                            label="Session"
                            onChange={e => handleSessionChange(e)}
                        >
                            <MenuItem value="2015-2016">2015-2016</MenuItem>
                            <MenuItem value="2016-2017">2016-2017</MenuItem>
                            <MenuItem value="2017-2018">2017-2018</MenuItem>
                            <MenuItem value="2018-2019">2018-2019</MenuItem>
                            <MenuItem value="2019-2020">2019-2020</MenuItem>
                            <MenuItem value="2020-2021">2020-2021</MenuItem>
                            <MenuItem value="2021-2022">2021-2022</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl width="90%">
                        <InputLabel>Semester</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={sem}
                            label="Session"
                            onChange={e => handleSemChange(e)}
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="outlined-read-only-input" label="Year" value={year} InputProps={{
                        readOnly: true,
                    }} />
                    <TextField name="price" label="Price" value={price} type="number" InputProps={{ inputProps: { min: 0, max: 1000 } }} onChange={e => handlePriceChange(e)} />
                    <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" name="image" hidden />
                    </Button>
                    <Button variant="contained" type="submit">Post</Button>
                    {/* {errors.length>0 ? <div className='error'>{errors.map(error => <p>{error}</p>)}</div> : ""} */}
                </Box>
            </Box> : <Box className='loading'></Box>}

        </Box>
    )
}

export default Sell
