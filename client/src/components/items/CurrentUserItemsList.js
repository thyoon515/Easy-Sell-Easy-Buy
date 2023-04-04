import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CurrentUserItemCard from './CurrentUserItemCard';
import { CurrentUserContext } from '../../context/CurrentUser';

const CurrentUserItemsList = ({ items, setItems, setEditItem }) => {
    
  const [errors, setErrors] = useState([]);
  const [currentUser] = useContext(CurrentUserContext)
  
  const handleRemoveItem = (deletedItem) => {
    const removeDeletedItemFromCurrentUser = currentUser.items.filter(item => item.id !== deletedItem.id)
      currentUser.items = removeDeletedItemFromCurrentUser
    const filteredItems = items.filter(item => item.id !== deletedItem.id)
      setItems(filteredItems)
  }

  const displayCurrentUserItems = currentUser.items.map(item => 
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