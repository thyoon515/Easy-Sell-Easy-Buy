import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';


const ItemsListPage = ({ users, locations }) => {

  const displayItems = users.map((user) => {
    
    return user.items.map(item => {
    
      const displayLocation = locations.map(location => {
        if (location.id === item.location_id) {
          return location.nyc_borough_name
        } else {
          return null
        }
      })

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
                  <Typography gutterBottom>
                    [ Posted by {user.username} ]
                  </Typography>
                  <Typography gutterBottom>
                    Interested? Send your offer {user.email}
                  </Typography>
                </CardContent>
              </Card>
          </Grid>
        )
      })
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
          </>
          
  )
}

export default ItemsListPage