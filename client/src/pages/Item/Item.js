import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Item.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AuthContext from '../../context/AuthContext';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import jwt_decode from "jwt-decode";

const Item = ({ change, setChange }) => {

    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [seller, setSeller] = useState(null);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadnum, setLoadnum] = useState(0);
    const [profile, setProfile] = useState(null);
    // const [change, setChange] = useState(false);

    let token = localStorage.getItem('authTokens')
    let decoded;

    const history = useNavigate()

    let { user } = useContext(AuthContext)

    const months = {
        0: 'JAN',
        1: 'FEB',
        2: 'MAR',
        3: 'APR',
        4: 'MAY',
        5: 'JUN',
        6: 'JUL',
        7: 'AUG',
        8: 'SEP',
        9: 'OCT',
        10: 'NOV',
        11: 'DEC',
    }

    const handleClickOpen = () => {
        user ? setOpen1(true) : history('/login');
    };

    const handleClickOpen2 = () => {
        user ? setOpen2(true) : history('/login');
    };

    const handleClose = (value) => {
        setOpen1(false);
    };

    const handleClose2 = (value) => {
        setOpen2(false);
    };

    const handleDelete = () => {
        token = JSON.parse(token).access;
        fetch(`https://trabify.herokuapp.com/books/${id}/?access=${token}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(change === true ? setChange(false) : setChange(true))
            // .then(history("/list"))

        const interval = setInterval(() => {
            history("/list");
            clearInterval(interval);
            window.location.reload();
        }, 1000);
    }

    useEffect(() => {
        fetch(`https://trabify.herokuapp.com/books/${id}/`)
            .then(response => response.json())
            .then(data => setItem(data))
            // .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (item != null) {
            setLoadnum(prev => prev + 1);
            fetch(`https://trabify.herokuapp.com/users/${item.user}/`)
                .then(response => response.json())
                .then(data => {
                    setSeller(data);
                })
                // .catch(err => console.log(err))
        }
    }, [item])

    useEffect(() => {
        if (loadnum === 2) {
            setLoading(false);
            document.getElementsByClassName('load')[0].classList.remove('load');
        }
    }, [loadnum])

    useEffect(() => {
        if (seller != null) {
            setLoadnum(prev => prev + 1);
            setDetails([`${seller.email}`, `${seller.phone}`])
        }
    }, [seller])

    useEffect(() => {
        if (token) {
            token = JSON.parse(token).access;
            decoded = jwt_decode(token);
            let id = decoded.user_id;
            fetch(`https://trabify.herokuapp.com/users/${id}/`)
                .then(response => response.json())
                .then(data => setProfile(data))
        }
    }, [window.location.href])

    return (
        <Box className='list-item load' sx={{ marginBottom: "0px" }}>
            {!loading ?
                <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-evenly" alignItems="center" margin={{ xs: "0 0 50px 0", md: "0 3rem" }}>
                    <Card sx={{ width: { xs: "100%", md: 470 }, height: { xs: "100%", md: 600 }, display: "flex", flexDirection: "column", alignItems: "center", margin: "20px 0" }}>
                        <CardMedia
                            className="image"
                            component="img"
                            height="300"
                            image={item.image}
                            alt="Not found"
                        />
                        <CardContent className='description'>
                            <Typography gutterBottom variant="h4" component="div" margin="15px 0">
                                {item.name}
                            </Typography>
                            <Box display="flex" justifyContent="space-between" alignItems="center" margin="30px 0">
                                <Typography variant="h6" color="text.secondary">Subject</Typography>
                                <Typography variant="h6">{item.subject}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" margin="30px 0">
                                <Typography variant="h6" color="text.secondary">Edition Year</Typography>
                                <Typography variant="h6">{item.session}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" margin="30px 0">
                                <Typography variant="h6" color="text.secondary">Semester</Typography>
                                <Typography variant="h6">{item.semester}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Box textAlign={{ xs: "center", md: "inherit" }}>
                        <Typography variant="h4" component="p" fontWeight="bold">
                            ₹ {item.price}
                        </Typography>
                        <Typography fontSize="14px" component="p" margin="20px 0" color="text.secondary">
                            Posted on: {months[new Date(`${item.date_posted}`).getMonth()]}
                            {" "}
                            {new Date(`${item.date_posted}`).getDate()}
                        </Typography>
                        <Box boxShadow="0px 0px 3px 0px rgb(0 0 0 / 20%)" width="300px" padding="5px 15px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                            <Box display="flex" justifyContent="space-between" alignItems="center" margin="15px 0" width="100%">
                                <Typography variant="h6" color="text.secondary">Seller Name</Typography>
                                <Typography variant="h6">{seller.name}</Typography>
                            </Box>
                            <Box>
                                <Button variant="outlined" sx={{ margin: "15px 0 15px 0" }} onClick={handleClickOpen}>
                                    Contact
                                </Button>
                                <Dialog onClose={handleClose} open={open1}>
                                    <DialogTitle>Seller Info</DialogTitle>
                                    <List sx={{ pt: 0 }}>
                                        {details ?
                                            <Box>
                                                <ListItem button key={seller.email}>
                                                    <ListItemAvatar>
                                                        <EmailIcon />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={seller.email} />
                                                </ListItem>
                                                {seller.phone ? <ListItem button key={seller.phone}>
                                                    <ListItemAvatar>
                                                        <PhoneIcon />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={seller.phone} />
                                                </ListItem> : ""}
                                            </Box>
                                            :
                                            <Box>
                                                Loading...
                                            </Box>
                                        }
                                    </List>
                                </Dialog>
                            </Box>
                        </Box>
                        {profile ? profile.email === seller.email ? <Button onClick={handleClickOpen2} variant="outlined" color="error" sx={{ margin: "15px 0" }}>
                            Delete
                        </Button> : "" : ""}
                        <Dialog onClose={handleClose2} open={open2}>
                            <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
                            <List sx={{ pt: 0 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "10px" }}>
                                    <Button variant="outlined" onClick={() => handleDelete()}>Yes</Button>
                                    <Button variant="outlined" onClick={handleClose2}>No</Button>
                                </Box>
                            </List>
                        </Dialog>

                    </Box>
                </Box>
                :
                <Box className='loading'></Box>}
        </Box>
    )
}

export default Item