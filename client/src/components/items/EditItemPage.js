import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { CurrentUserContext } from '../../context/CurrentUser';

const EditItemPage = ({ users, setUsers, editItem, locations }) => {

    const [currentUser] = useContext(CurrentUserContext);

    const navigate = useNavigate();

    const [editItemFormData, setEditItemFormData] = useState({
      title: editItem.title,
      image: editItem.image,
      price: editItem.price,
      description: editItem.description
    });
    const [errors, setErrors] = useState([]);
    const [editSelectLocation, setEditSelectLocation] = useState(editItem.location_id);

    const handleEditedItem = (editedItem) => {
      const currentUserItemsArray = currentUser.items.map(item => {
        if(item.id === editedItem.id){
          return editedItem
        } else {
          return item
        }
      })
      currentUser.items = currentUserItemsArray
      const filteredUsers = users.filter(user => user.id !== currentUser.id)
      const updatedUsers = [...filteredUsers, currentUser]
      setUsers(updatedUsers)
    }
  
    const handleSubmitEdit = (e) => {
      e.preventDefault();
      fetch(`/items/${editItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editItemFormData.title,
          image: editItemFormData.image,
          price: editItemFormData.price,
          description: editItemFormData.description,
          location_id: editSelectLocation
        }),
      })
        .then((r) => {
          if(r.ok){
            r.json().then((editedItem) =>{
                handleEditedItem(editedItem)
                navigate(`/users/${currentUser.id}/items`)
            })
        }else{
            r.json().then((e) => {
              setErrors(e.errors)
            })
        }
      })
    }
  
    const handleEditChange = (e) => {
      const key = e.target.id
      setEditItemFormData({
        ...editItemFormData,
        [key]: e.target.value
      })
    }

    const handleChangeLocation = (e) => {
      setEditSelectLocation(e.target.value)
    }

    const displayLocation = locations.map((location) => {
      return (
        <MenuItem key={location.id} value={location.id}>{location.nyc_borough_name}</MenuItem>
      )
    })
  
    return ( 
      <form onSubmit={handleSubmitEdit}>
        <Container maxWidth="sm">
          <Box sx={{ m: 4}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline 
                  id="title" 
                  onChange={handleEditChange} 
                  value={editItemFormData.title} 
                  label="Title" 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline 
                  id="image" 
                  onChange={handleEditChange} 
                  value={editItemFormData.image} 
                  label="Image URL" 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  id="price" 
                  onChange={handleEditChange} 
                  value={editItemFormData.price} 
                  label="Price" 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline 
                  id="description" 
                  onChange={handleEditChange} 
                  value={editItemFormData.description} 
                  label="Description" 
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select NYC Borough</InputLabel>
                  <Select
                    id="selectLocation"
                    value={editSelectLocation}
                    label="Select NYC Borough"
                    onChange={handleChangeLocation} >
                      {displayLocation}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">Edit Item</Button>
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

export default EditItemPage