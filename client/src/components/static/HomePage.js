import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const HomePage = ({ currentUser }) => {

  if (currentUser) {
    return <div align='center' >
              <h1>Welcome, {currentUser.username}!</h1>
              <Button color="primary"component={ Link } to={`/users/${currentUser.id}/items`}>Click To See Your Items</Button>
           </div>
  } else {
    return <div align='center' >
              <h1>Easy to Sell, Easy to Buy within NYC</h1>
              <h1>Please, Log In to Start!</h1>
           </div>
  }
}

export default HomePage