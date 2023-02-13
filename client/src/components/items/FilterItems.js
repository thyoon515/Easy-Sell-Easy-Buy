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

const FilterItems = ({ items }) => {

    const [selectLocation, setSelectLocation] = useState('')

    const handleChangeSelectLocation = (e) => {
      setSelectLocation(e.target.value)
    }
  
    const filteredItems = items.filter((item) => 
      item.location_id === selectLocation
    )
  
    const displayItems = filteredItems.map((item) => {
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
                    Available in {item.location.nyc_borough_name}
                </Typography>
                <Typography gutterBottom>
                    {item.price}
                </Typography>
                <Typography gutterBottom>
                    {item.description}
                </Typography>
              </CardContent>
            </Card>
          </form>
        </Grid>
      )
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
          <Container sx={{ py: 4 }} maxWidth="md">
            <Grid container spacing={4}>
              {displayItems}
            </Grid>
          </Container>
        </Box>
      </Container>
      
    )
}

export default FilterItems