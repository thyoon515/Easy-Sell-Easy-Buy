import { useContext } from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CurrentUserContext } from '../../context/CurrentUser';

const HomePage = () => {

  const [ currentUser ] = useContext(CurrentUserContext)

  const currentUserExist = () => {
    return (
      <div align='center' >
        <h1>Welcome, {currentUser.username}!</h1>
          <Button color="primary"component={ Link } to={`/users/${currentUser.id}/items`}>Click To See Your Items</Button>
      </div>
    )
  }

  const noCurrentUser = () => {
    return (
      <div align='center' >
        <h1>Easy to Sell, Easy to Buy within NYC</h1>
        <h1>Please, Log In to Start!</h1>
      </div>
    )
  }

  return (
    <div>
      { currentUser ? currentUserExist() : noCurrentUser() }
    </div>
  )
  
  // if (currentUser) {
  //   return <div align='center' >
  //             <h1>Welcome, {currentUser.username}!</h1>
  //             <Button color="primary"component={ Link } to={`/users/${currentUser.id}/items`}>Click To See Your Items</Button>
  //          </div>
  // } else {
  //   return <div align='center' >
  //             <h1>Easy to Sell, Easy to Buy within NYC</h1>
  //             <h1>Please, Log In to Start!</h1>
  //          </div>
  // }
}


export default HomePage