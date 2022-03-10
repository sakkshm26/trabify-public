import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './Footer.css';

const Footer = () => {

    const handleMail = () => {
        window.open('mailto:trabify@gmail.com');
    }

    return (
        <Box className='footer' sx={{ boxShadow: "0px 8px 14px 0px black", backgroundColor:"white", position:"fixed", bottom: "0", padding: "10px 0", display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", right: "0", left: "0" }}>
            <Typography marginTop="5px">Made for JSS 🏫</Typography>
            <Typography marginTop="5px">Contact us at <span className='email-link' onClick={() => handleMail()}>trabify@gmail.com</span></Typography>
        </Box>
    )
}

export default Footer
