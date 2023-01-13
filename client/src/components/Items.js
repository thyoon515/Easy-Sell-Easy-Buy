import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Items = ({ items }) => {

    const displayItems = items.map(item => {

        return(
            <form>
              <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', height: '23vh', m: 4}}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" key={item.id}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {item.image}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.price}
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" >Edit</Button>
                    </CardActions>
                  </Card>
                </Box>
              </Container>
            </form>
            
            )

    })

  return (
    <div>{displayItems}</div>
  )
}

export default Items