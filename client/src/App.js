import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navigation/NavBar';
import HomePage from "./components/static/HomePage";
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";
import Items from './components/items/Items';
import AddItem from './components/items/AddItem';
import EditItem from './components/items/EditItem';
import Transactions from './components/transactions/Transactions';

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    fetch('/me').then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setCurrentUser(user)
          setUserLoggedIn(true)
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch('/items')
      .then((r) => r.json())
      .then((itemData) => setItems(itemData))
  },[])

  useEffect(() => {
    fetch(`/users/${currentUser.id}`)
      .then((r) => r.json())
      .then(userInfo => setUserTransactions(userInfo))
  },[currentUser.id])

  const handleAddItem = (postNewItem) => {
    setItems([...items, postNewItem])
  }

  const removeItemFromItems = (deletedItem) => {
    const updatedListOfItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedListOfItems)
  }

  const handleEditedItem = (editedItem) => {
    const updatedItem = items.map(item => {
      if(item.id === editedItem.id){
        return editedItem;
      } else {
        return item;
      }
    })
    setItems(updatedItem)
  }

  console.log(userTransactions)

  return (
    <BrowserRouter>
      <NavBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/items" element={<Items items={items} removeItemFromItems={removeItemFromItems} setEditItem={setEditItem} />} />
        <Route path='/addItem' element={<AddItem handleAddItem={handleAddItem} />} />
        <Route path='/editItem' element={<EditItem editItem={editItem} handleEditedItem={handleEditedItem} />} />
        <Route path='/transactions' element={<Transactions userTransactions={userTransactions} setUserTransactions={setUserTransactions}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
