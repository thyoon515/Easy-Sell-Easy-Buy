import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navigation/NavBar';
import HomePage from "./components/static/HomePage";
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";
import ItemsList from './components/items/ItemsList';
import AddItemForm from './components/items/AddItemForm';
import EditItemForm from './components/items/EditItemForm';
import ItemsListByLocation from './components/items/ItemsListByLocation';
import CurrentUserItemsList from './components/items/CurrentUserItemsList.js';

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [editItem, setEditItem] = useState([]);
  const [locations, setLocations] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/items')
      .then(r => r.json())
      .then(allItems => setItems(allItems))
  },[])


  useEffect(() => {
    fetch('/locations')
      .then(r => r.json())
      .then(locationsData => setLocations(locationsData))
  }, [])

  useEffect(() => {
    fetch('/me').then((response) => {
      if (response.ok) {
        response.json().then(() => {
          setUserLoggedIn(true)
        });
      }
    });
  }, []); 

  return (
    <BrowserRouter>
      <NavBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage userLoggedIn={userLoggedIn} />} />
        <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/signup" element={<Signup setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/items" element={<ItemsList items={items} />} />
        <Route path='/items/new' element={<AddItemForm items={items} setItems={setItems} locations={locations} />} />
        <Route path='/items/:id/edit' element={<EditItemForm items={items} setItems={setItems} editItem={editItem} locations={locations} />} />
        <Route path='/items/locations' element={<ItemsListByLocation items={items} />} />
        <Route path='/users/:id/items' element={<CurrentUserItemsList items={items} setItems={setItems} setEditItem={setEditItem} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
