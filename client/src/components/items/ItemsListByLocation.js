import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ItemByLocationCard from './ItemByLocationCard';

const ItemsListByLocation = ({ items }) => {

    const [selectLocation, setSelectLocation] = useState('')

    const handleChangeSelectLocation = (e) => {
      setSelectLocation(e.target.value)
    }

    const filteredItems = items.filter((item) => {
      if (item.location.id === selectLocation) {
        return true
      } else {
        return false
      }
    })

    const displayItemsByLocation = filteredItems.map(item => 
      <ItemByLocationCard key={item.id} item={item} />)

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
              { displayItemsByLocation }
            </Grid>
          </Container>
        </Box>
      </Container>
    )
}

export default ItemsListByLocation