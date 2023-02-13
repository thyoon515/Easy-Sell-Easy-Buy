import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';


const NavBar = ({ setCurrentUser, setUserLoggedIn, userLoggedIn }) => {
  
  
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', {
      method: "DELETE",
    }).then(() => {
      setCurrentUser('') 
      setUserLoggedIn(false)
      navigate('/')
    })
  }

  const loggedInLinks = () => {
    return(
      <>
        <Button color="secondary" component={ Link } to="/">Home</Button>
        <Button color="secondary" component={ Link } to="/items">[ All Items ]</Button>
        <Button color="secondary" component={ Link } to="/addItem">[ Post A Item ]</Button>
        <Button color="secondary" component={ Link } to="/filterItems">[ Items By Locations ]</Button>
        <Button color="secondary" onClick={ handleLogout }>Logout</Button>
      </>
    )
  }

  const loggedOutLinks = () => {
    return(
    <>
      <Button color="secondary" component={ Link } to="/login">Login</Button>
    </>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography fontWeight='900' fontStyle='italic' color="#fafafa" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ESEB
          </Typography>
          { userLoggedIn ? loggedInLinks() : loggedOutLinks() }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar