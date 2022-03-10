import React from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './Home.css';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
// import books from '../../assets/books.jpg';

const Home = () => {

    const { authTokens, logoutUser } = useContext(AuthContext);

    return (
        <Box className='home' display="flex" flexDirection="column" alignItems="center" margin="30px 0">
            <Typography variant="h1" component="h1" textAlign="center" marginTop="50px" color="var(--primary)" sx={{ fontSize: {xs: "4rem", md: "6rem"} }}>Trabify</Typography>
            <Typography variant="h4" component="h4" textAlign="center" margin="40px 0 0 0" color="var(--primary)" sx={{ fontSize: {xs: "22px", md: "32px"} }} letterSpacing="3px">Sell old books, or buy them now!
            </Typography>
            <Box margin="50px 0 50px 0" border="1px solid #c2c2c2" borderRadius="5px" sx={{width:{xs:"82vw", sm:"60vw", md:"50vw", lg:"40vw" }, padding:{xs:"10px 15px", sm:"10px 20px"}}} boxShadow="0px 1px 8px 0px #cccccc">
                <Typography margin="10px 0" textAlign="center" color="var(--primary)" sx={{ fontSize: {xs: "19px", md: "25px"} }}>How it works?</Typography>
                <Typography marginBottom="25px" textAlign="center">We allow users to post their books which they want to sell to the college students. Also, users can browse the available books and contact the seller for more information. Check out the <NavLink to="/list"><Box variant="span" component="span" color="var(--primary)" fontWeight="500">Books</Box></NavLink> tab for the list of available products and the <NavLink to="/sell"><Box variant="span" component="span" color="var(--primary)" fontWeight="500">Sell</Box></NavLink> tab for posting one.</Typography>
            </Box>
            <hr />
            <Box display="flex" justifyContent="space-around" sx={{ width: {xs: "85%", sm: "50%",md: "30%"} }}>
                <NavLink to='/list'><Button startIcon={<FormatListBulletedIcon />}>View All</Button></NavLink>
                <NavLink to='/sell'><Button startIcon={<AddIcon />}>Sell</Button></NavLink>
            </Box>
            <Box margin="60px 0 70px 0" className='bottom' width="100%" height="300px" size="100%">
            </Box>
            <Typography variant="h4" textAlign="center" margin="10px 0 30px 0" color="var(--primary)" sx={{ fontSize: {xs: "30px", md: "40px"} }} fontWeight="500">Get Started</Typography>
            <Box display="flex" justifyContent="space-around" sx={{ width: {xs: "85%", sm: "50%",md: "30%"} }} marginBottom="8rem">
                <NavLink to='/register'><Button>Sign Up</Button></NavLink>
                <NavLink to='/login'><Button>Login</Button></NavLink>
            </Box>
        </Box>
    )
}

export default Home
