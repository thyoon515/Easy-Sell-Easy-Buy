import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navigation/NavBar';
import HomePage from "./components/static/HomePage";
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";
import Items from './components/items/Items';
import AddItem from './components/items/AddItem';
import EditItem from './components/items/EditItem';
import FilterItems from './components/items/FilterItems';

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState([]);
  const [locations, setLocations] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then(r => r.json())
      .then(userData => setUserInfo(userData))
  },[])

  useEffect(() => {
    fetch('/locations')
      .then(r => r.json())
      .then(locationData => setLocations(locationData))
  }, [])

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

  return (
    <BrowserRouter>
      <NavBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/items" element={<Items editItem={editItem} items={items} removeItemFromItems={removeItemFromItems} setEditItem={setEditItem} userInfo={userInfo} />} />
        <Route path='/items/new' element={<AddItem handleAddItem={handleAddItem} locations={locations} currentUser={currentUser} />} />
        <Route path='/editItem' element={<EditItem editItem={editItem} handleEditedItem={handleEditedItem} locations={locations} />} />
        <Route path='/items/filterByLocation' element={<FilterItems items={items} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
