import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import CurrentUserItemCard from './CurrentUserItemCard';

const CurrentUserItemsList = ({ items, setItems, setEditItem, currentUserItems, setCurrentUserItems }) => {
    
  const {id} = useParams();
  const [errors, setErrors] = useState([]);
  
  
    useEffect(() => {
      // eslint-disable-next-line
      const filteredCurrentUserItems = items.filter(item => item.user.id == id)
        setCurrentUserItems(filteredCurrentUserItems)
    },[items, id, setCurrentUserItems])


  const handleRemoveItem = (deletedItem) => {
    const removeDeletedItemFromCurrentUserItems = currentUserItems.filter(item => item.id !== deletedItem.id)
      setCurrentUserItems(removeDeletedItemFromCurrentUserItems)
    const filteredItems = items.filter(item => item.id !== deletedItem.id)
      setItems(filteredItems)
  }

  const displayCurrentUserItems = currentUserItems.map(item => 
    <CurrentUserItemCard 
      key={item.id} 
      item={item} 
      setErrors={setErrors} 
      setEditItem={setEditItem} 
      handleRemoveItem={handleRemoveItem}
    /> )

  return (
    <>
    <div>
        <Container sx={{ py: 4 }} maxWidth="md">
          <Grid container spacing={4}>
            {displayCurrentUserItems}
          </Grid>
        </Container>
    </div>
    <div>
      {errors && (
        <ul style={{ color: "red" }}>
          {errors.map((error) => (
          <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
    </>
    
  )
}

export default CurrentUserItemsList