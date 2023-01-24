import { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';

const Items = ({ items, removeItemFromItems }) => {

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
        } else {
          res.json().then((e) => {
            setErrors(e.error)
          })
        }
      })
    }
    
    return (
    <Grid item key={item.id} xs={12} sm={6} md={4}>
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
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography>
            {item.price}
          </Typography>
          <Typography>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Buy</Button>
          <Button size="small">Edit</Button>
          <Button size="small" onClick={handleDeleteItem}>Delete</Button>
        </CardActions>
      </Card>
    </Grid>
    )
  })

  return (
    <>
    <div>
       <Container sx={{ py: 4 }} maxWidth="md">
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