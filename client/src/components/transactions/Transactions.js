import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const Transactions = () => {

  const [transactionType, setTransactionType] = useState('')

  const handleChangeTransactionType = (e) => {
    setTransactionType(e.target.value)
  }

  const handleClickTransactionSearch = () => {
    
  }

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
            <MenuItem value='All' >All</MenuItem>
            <MenuItem value='Sale' >Sale</MenuItem>
            <MenuItem value='Purchase' >Purchase</MenuItem>
          </Select>
            <Button type='submit' variant="contained" onClick={handleClickTransactionSearch}>Search</Button>
        </FormControl>
      </Box>
    </Container>
    
  )
}

export default Transactions