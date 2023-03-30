import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

const ItemCard = ({ item }) => {
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
                Available in {item.location.nyc_borough_name}
                </Typography>
                <Typography gutterBottom>
                {item.price}
                </Typography>
                <Typography gutterBottom>
                {item.description}
                </Typography>
                <Typography gutterBottom>
                [ Posted by {item.user.username} ]
                </Typography>
                <Typography gutterBottom>
                Interested? Send your offer {item.user.email}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
  )
}

export default ItemCard