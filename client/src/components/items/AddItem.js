import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const AddItem = ({ handleAddItem }) => {
    const navigate = useNavigate();

    const [addItemFormData, setAddItemFormData] = useState({
      title: "",
      image: "",
      price: "",
      description: ""
    })
  
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
          description: addItemFormData.description
        }),
      })
        .then((r) => r.json())
        .then((postNewItem) =>{
          handleAddItem(postNewItem)
          navigate('/items')
        })
      setAddItemFormData({})
      
    }
  
    const handleChange = (e) => {
      const key = e.target.id
      setAddItemFormData({
        ...addItemFormData,
        [key]: e.target.value
      })
    }
  
    return ( 
      <form onSubmit={handleSubmit}>
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: '#cfe8fc', height: '50vh', m: 4}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField 
                  id="title" 
                  onChange={handleChange} 
                  value={addItemFormData.title} 
                  label="Title" 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  id="image" 
                  onChange={handleChange} 
                  value={addItemFormData.image} 
                  label="Image URL" 
                />
              </Grid>
              <Grid item xs={4}>
                <TextField 
                  id="price" 
                  onChange={handleChange} 
                  value={addItemFormData.price} 
                  label="Price" 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  id="description" 
                  onChange={handleChange} 
                  value={addItemFormData.description} 
                  label="Description" 
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">Add Item</Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
    );
}

export default AddItem