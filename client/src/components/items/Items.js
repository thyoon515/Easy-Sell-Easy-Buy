import { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import FilterItems from './FilterItems';

const Items = ({ items, removeItemFromItems, setEditItem }) => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState([])

  const displayItems = items.map((item) => {

    const handleDeleteItem = () => {
      fetch(`/items/${item.id}`, {
        method:'DELETE'
      })
      .then(res => {
        if(res.ok){
          res.json().then((deletedItem) => {
            removeItemFromItems(deletedItem)
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
      navigate('/editItem')
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
                Available in {item.location.nyc_borough_name}
              </Typography>
              <Typography gutterBottom>
                {item.price}
              </Typography>
              <Typography gutterBottom>
                {item.description}
              </Typography>
              <Typography gutterBottom>
                Posted by 
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
            <FilterItems />
          </Grid>
          <Grid container spacing={4}>
            {displayItems}
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

export default Items