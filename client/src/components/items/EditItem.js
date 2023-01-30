import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const EditItem = ({ editItem, handleEditedItem }) => {
    const navigate = useNavigate();

    const [editItemFormData, setEditItemFormData] = useState({
      title: editItem.title,
      image: editItem.image,
      price: editItem.price,
      description: editItem.description
    })
    const [errors, setErrors] = useState([])
  
    const handleSubmitEdit = (e) => {
      e.preventDefault();
      fetch(`items/${editItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editItemFormData.title,
          image: editItemFormData.image,
          price: editItemFormData.price,
          description: editItemFormData.description
        }),
      })
        .then((r) => {
          if(r.ok){
            r.json().then((editedItem) =>{
                handleEditedItem(editedItem)
                navigate('/items')
            })
        }else{
            r.json().then((e) => {
              setErrors(e.errors)
            })
        }
      })
      setEditItemFormData({
        title: "",
        image: "",
        price: "",
        description: ""
      })
    }
  
    const handleEditChange = (e) => {
      const key = e.target.id
      setEditItemFormData({
        ...editItemFormData,
        [key]: e.target.value
      })
    }
  
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

export default EditItem