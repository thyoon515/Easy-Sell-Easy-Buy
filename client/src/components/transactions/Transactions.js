import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Transactions = ({ items }) => {

  const [transactionType, setTransactionType] = useState('')

  const handleChangeTransactionType = (e) => {
    console.log(e.target.value)
    setTransactionType(e.target.value)
  }

  const handleClickTransactionSearch = () => {
    
  }

  const displayItems = items.map((item) => {
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
              <Typography gutterBottom variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography>
                {item.price}
              </Typography>
              <Typography>
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
          <InputLabel>Transaction Type</InputLabel>
          <Select
            label="Transaction Type"
            value={transactionType}
            onChange={handleChangeTransactionType}
          >
            <MenuItem value={1} >All</MenuItem>
            <MenuItem value={2} >Sale</MenuItem>
            <MenuItem value={3} >Purchase</MenuItem>
          </Select>
            <Button type='submit' variant="contained" onClick={handleClickTransactionSearch}>Search</Button>
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

export default Transactions