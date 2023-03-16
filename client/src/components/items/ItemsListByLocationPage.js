import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ItemsListByLocationPage = ({ users, locations }) => {

    const [selectLocation, setSelectLocation] = useState('')

    const handleChangeSelectLocation = (e) => {
      setSelectLocation(e.target.value)
    }

    const displayFilteredItems = users.map((user) => {

      const filteredItems = user.items.filter((item) => {
        if (item.location_id === selectLocation)
        return item
    })

      return filteredItems.map((item) =>{

        const displayLocation = locations.map(location => {
          if (location.id === item.location_id)
          return location.nyc_borough_name
        })

          return (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <form>
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
              </form>
            </Grid>
          )
        })
      })
     
    return (
      <Container maxWidth="sm">
        <Box sx={{ m: 4 }} >
          <FormControl fullWidth >
            <InputLabel>Select NYC Borough</InputLabel>
            <Select
              label="Select NYC Borough"
              value={selectLocation}
              onChange={handleChangeSelectLocation}
            >
              <MenuItem value={1} >The Bronx</MenuItem>
              <MenuItem value={2} >Queens</MenuItem>
              <MenuItem value={3} >Manhattan</MenuItem>
              <MenuItem value={4} >Brooklyn</MenuItem>
              <MenuItem value={5} >Staten Island</MenuItem>
            </Select>
          </FormControl>
          <Container>
            <Grid>
              { displayFilteredItems }
            </Grid>
          </Container>
        </Box>
      </Container>
    )
}

export default ItemsListByLocationPage