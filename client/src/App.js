import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navigation/NavBar';
import HomePage from "./components/static/HomePage";
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";
import AllItemsList from './components/items/AllItemsList';
import AddItemPage from './components/items/AddItemPage';
import EditItemForm from './components/items/EditItemForm';
import ItemsListByLocation from './components/items/ItemsListByLocation';
import CurrentUserItemsList from './components/items/CurrentUserItemsList.js';

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [editItem, setEditItem] = useState([]);
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [currentUserItems, setCurrentUserItems] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then(r => r.json())
      .then(usersData => setUsers(usersData))
  },[])

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
        <Route path="/items" element={<AllItemsList items={items} />} />
        <Route path='/items/new' element={<AddItemPage users={users} setUsers={setUsers} locations={locations} />} />
        <Route path='/items/:id/edit' element={<EditItemForm items={items} setItems={setItems} currentUserItems={currentUserItems} setCurrentUserItems={setCurrentUserItems} editItem={editItem} locations={locations} />} />
        <Route path='/items/locations' element={<ItemsListByLocation items={items} />} />
        <Route path='/users/:id/items' element={<CurrentUserItemsList items={items} setItems={setItems} currentUserItems={currentUserItems} setCurrentUserItems={setCurrentUserItems} setEditItem={setEditItem} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
