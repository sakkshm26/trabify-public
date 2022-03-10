import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css';
import logo from '../../assets/TrabifyLogo.png';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import jwt_decode from "jwt-decode";
import defpro from '../../assets/Profile1.png';

const ResponsiveAppBar = ({ list, setList, original }) => {

    let { user, logoutUser } = useContext(AuthContext)
    let token = localStorage.getItem('authTokens')
    let decoded;

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [display, setDisplay] = useState('block');
    const [profile, setProfile] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChange = () => {
        let value = document.getElementById('search-value').value;
        if (value === "") {
            setList(original);
        }
    }

    const handleSearch = e => {
        let value = document.getElementById('search-value').value.toLowerCase();
        let newList = original.filter(book => book.name.toLowerCase().includes(`${value}`));
        setList(newList);
        // console.log(window.location.href.slice(-5, -1))
    }

    const handleLogout = () => {
        logoutUser();
        setProfile(null);
    }

    useEffect(() => {
        if (window.location.href.slice(-4) === 'list' || window.location.href.slice(-5, -1) === 'list') {
            setDisplay('block');
        }
        else {
            setDisplay('none');
        }
        if (token) {
            token = JSON.parse(token).access
            decoded = jwt_decode(token);
            let id = decoded.user_id;
            fetch(`https://trabify.herokuapp.com/users/${id}/`)
                .then(response => response.json())
                .then(data => setProfile(`${data.name}`.slice(0, 1)))
        }
    }, [window.location.href])

    return (
        <AppBar position="static" className='navbar' sx={{ backgroundColor: "#fff" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} alt="Not found" className='logo' />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: "#000" }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                color: "#000",
                            }}
                        >
                            <NavLink to='/'>
                                <MenuItem key="home" onClick={handleCloseNavMenu} display="flex" width="150px">
                                    <HomeIcon sx={{ marginRight: "20px" }} />
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to='/list'>
                                <MenuItem key="items" onClick={handleCloseNavMenu} display="flex" width="150px">
                                    <FormatListBulletedIcon sx={{ marginRight: "20px" }} />
                                    <Typography textAlign="center">Books</Typography>
                                </MenuItem>
                            </NavLink>
                            <NavLink to='/sell'>
                                <MenuItem key="sell" onClick={handleCloseNavMenu} display="flex" width="150px">
                                    <AddIcon sx={{ marginRight: "20px" }} />
                                    <Typography textAlign="center">Sell</Typography>
                                </MenuItem>
                            </NavLink>
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, margin: "0 30px" }}>
                        <NavLink to='/'>
                            <Button
                                key="home"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                Home
                            </Button>
                        </NavLink>
                        <NavLink to='/list'>
                            <Button
                                key="books"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                Books
                            </Button>
                        </NavLink>
                        <NavLink to='/sell'>
                            <Button
                                key="sell"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                Sell
                            </Button>
                        </NavLink>
                    </Box>
                    <Box display={display} margin="0 30px">
                        <InputBase
                            sx={{ ml: 1, flex: 1, width: { xs: "90px", sm: "100px" } }}
                            placeholder="Search Item"
                            inputProps={{ 'aria-label': 'Search book' }}
                            id="search-value"
                            onChange={() => handleChange()}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={() => handleSearch()}>
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <Box className="profile" sx={{ flexGrow: 0, display: "flex", justifyContent: "space-between", width: "3%" }} >

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {profile ? <Box sx={{ background: '#e2e2e2', padding: '5px 10px', borderRadius: '50%' }}>{profile}</Box> : <img className='profile-image' src={defpro} alt='User' />}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user ?
                                <MenuItem key="logout" onClick={() => handleLogout()}>
                                    <Typography textAlign="center">Log Out</Typography>
                                </MenuItem>
                                :
                                <Box>
                                    <NavLink to='/register' className="auth-link">
                                        <MenuItem key="register" onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Register</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <NavLink to='/login' className="auth-link">
                                        <MenuItem key="login" onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Login</Typography>
                                        </MenuItem>
                                    </NavLink>
                                </Box>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
