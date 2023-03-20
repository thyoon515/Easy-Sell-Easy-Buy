import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CurrentUserContext } from '../../context/CurrentUser';

const AddItemPage = ({ users, setUsers, locations }) => {
    
  const navigate = useNavigate();

  const [addItemFormData, setAddItemFormData] = useState({
    title: "",
    image: "",
    price: "",
    description: ""
  });
  const [selectLocation, setSelectLocation] = useState('');
  const [errors, setErrors] = useState([]);
  const [currentUser] = useContext(CurrentUserContext);
  // eslint-disable-next-line
  const [currentUserItems, setCurrentUserItems] = useState(currentUser.items);

  const handleAddItem = (postNewItem) => {
    const newCurrentUserItemsArray = [...currentUser.items, postNewItem]
    const updatedCurrentUserItemsArray = currentUser.items = newCurrentUserItemsArray
    setCurrentUserItems(updatedCurrentUserItemsArray)
    const filteredUsers = users.filter(user => user.id !== currentUser.id)
    const updatedUsers = [...filteredUsers, currentUser]
    setUsers(updatedUsers)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/items', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: addItemFormData.title,
        image: addItemFormData.image,
        price: addItemFormData.price,
        description: addItemFormData.description,
        user_id: currentUser.id,
        location_id: selectLocation
      }),
    })
      .then((r) => {
        if(r.ok){
          r.json().then((postNewItem) =>{
            handleAddItem(postNewItem)
            navigate(`/users/${currentUser.id}/items`)
        })
      }else{
          r.json().then((e) => {
            setErrors(e.errors)
          })
      }
    })
    setAddItemFormData({
      title: "",
      image: "",
      price: "",
      description: ""
    })
  }

  const handleChange = (e) => {
    const key = e.target.id
    setAddItemFormData({
      ...addItemFormData,
      [key]: e.target.value
    })
  }

  const handleChangeLocation = (e) => {
    setSelectLocation(e.target.value)
  }

  const displayLocation = locations.map((location) => {
    return (
      <MenuItem key={location.id} value={location.id}>{location.nyc_borough_name}</MenuItem>
    )
  })

  return ( 
    <form onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <Box sx={{ m: 4}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline 
                id="title" 
                onChange={handleChange} 
                value={addItemFormData.title} 
                label="Title" 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline 
                id="image" 
                onChange={handleChange} 
                value={addItemFormData.image} 
                label="Image URL" 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id="price" 
                onChange={handleChange} 
                value={addItemFormData.price} 
                label="Price" 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline 
                id="description" 
                onChange={handleChange} 
                value={addItemFormData.description} 
                label="Description" 
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select NYC Borough</InputLabel>
                <Select
                  id="selectLocation"
                  value={selectLocation}
                  label="Select NYC Borough"
                  onChange={handleChangeLocation} >
                    {displayLocation}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">Add Item</Button>
              <div>
                {errors && (
                <ul style={{ color: "red" }}>
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
                )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
}

export default AddItemPage