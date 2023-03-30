import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ItemCard from './ItemCard';

const ItemsListPage = ({ items }) => {

  const displayItems = items.map(item => 
    <ItemCard key={item.id} item={item} />)
        return (
          <div>
            <Container sx={{ py: 4 }} maxWidth="md">
                <Grid container spacing={4}>
                  {displayItems}
                </Grid>
              </Container>
          </div>
  )
}

export default ItemsListPage