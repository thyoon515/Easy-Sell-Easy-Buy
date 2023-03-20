import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navigation/NavBar';
import HomePage from "./components/static/HomePage";
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";
import ItemsListPage from './components/items/ItemsListPage';
import AddItemPage from './components/items/AddItemPage';
import EditItemPage from './components/items/EditItemPage';
import ItemsListByLocationPage from './components/items/ItemsListByLocationPage';
import CurrentUserItemsPage from './components/items/CurrentUserItemsPage';

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [editItem, setEditItem] = useState([]);
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then(r => r.json())
      .then(usersData => setUsers(usersData))
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
        <Route path="/items" element={<ItemsListPage users={users} locations={locations} />} />
        <Route path='/items/new' element={<AddItemPage users={users} setUsers={setUsers} locations={locations} />} />
        <Route path='/items/:id/edit' element={<EditItemPage users={users} setUsers={setUsers} editItem={editItem} locations={locations} />} />
        <Route path='/items/locations' element={<ItemsListByLocationPage users={users} locations={locations} />} />
        <Route path='/users/:id/items' element={<CurrentUserItemsPage users={users} setUsers={setUsers} locations={locations} setEditItem={setEditItem} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
