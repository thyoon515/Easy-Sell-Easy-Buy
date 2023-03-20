import { useState, useContext } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUser';

const CurrentUserItemsPage = ({ users, setUsers, locations, setEditItem }) => {
    
  const navigate = useNavigate();

  const [currentUser] = useContext(CurrentUserContext);
  const [errors, setErrors] = useState([]);

  const handleRemoveItem = (deletedItem) => {
    const filteredCurrentUserItems = currentUser.items.filter(item => item.id !== deletedItem.id)
    currentUser.items = filteredCurrentUserItems
    const filteredUsers = users.filter(user => user.id !== currentUser.id)
    const updatedUsers = [...filteredUsers, currentUser]
    setUsers(updatedUsers)
  }

  const displayCurrentUserItems = currentUser.items.map((item) => {

    const displayLocation = locations.map(location => {
      if (location.id === item.location_id) {
        return location.nyc_borough_name
      } else {
        return null
      }
    })

    const handleDeleteItem = () => {
      fetch(`/items/${item.id}`, {
        method:'DELETE'
      })
      .then(res => {
        if(res.ok){
          res.json().then((deletedItem) => {
            handleRemoveItem(deletedItem)
          })
        }else{
          res.json().then((e) => {
            setErrors(e.error)
          })
        }
      })
    }

    const handleClickEditItem = () => {
      setEditItem(item)
    }
    
    const handleEditSubmit = (e) => {
      e.preventDefault()
      navigate(`/items/${item.id}/edit`)
    }

    return (
      <Grid item key={item.id} xs={12} sm={6} md={4}>
        <form onSubmit={handleEditSubmit}>
          <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
              <CardMedia
                component="img"
                sx={{
                  pt: '56.25%',
                }}
                image={item.image}
                alt="item_image"
              />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h4" component="h2">
                {item.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                Available in {displayLocation}
              </Typography>
              <Typography gutterBottom>
                {item.price}
              </Typography>
              <Typography gutterBottom>
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" type="submit" onClick={handleClickEditItem}>Edit</Button>
              <Button size="small" onClick={handleDeleteItem}>Delete</Button>
            </CardActions>
          </Card>
        </form>
        
      </Grid>
    )
  })

  return (
    <>
    <div>
        <Container sx={{ py: 4 }} maxWidth="md">
          <Grid container spacing={4}>
            {displayCurrentUserItems}
          </Grid>
        </Container>
    </div>
    <div>
      {errors && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
          <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
    </>
    
  )
}

export default CurrentUserItemsPage