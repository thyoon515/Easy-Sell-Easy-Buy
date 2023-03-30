import React from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

const CurrentUserItemCard = ({ item, setErrors, setEditItem, handleRemoveItem }) => {

    const navigate = useNavigate();

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
                  Available in {item.location.nyc_borough_name}
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
    }
export default CurrentUserItemCard