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

  const [currentUser, setCurrentUser] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState([]);
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]); 
  const [currentUserItems, setCurrentUserItems] = useState([]);

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
        response.json().then((user) => {
          setCurrentUser(user)
          setUserLoggedIn(true)
          setCurrentUserItems(user.items)
        });
      }
    });
  }, []); 

  // useEffect(() => {
  //   fetch('/items')
  //     .then((r) => r.json())
  //     .then((itemData) => {
  //       setItems(itemData);
  //     })
  // },[])

  const handleAddItem = (postNewItem) => {
    setItems([...items, postNewItem])
    setCurrentUserItems([...currentUserItems, postNewItem])
  }

  const removeItemFromItems = (deletedItem) => {
    const updatedListOfItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedListOfItems)
    const updatedListOfCurrentUserItems = currentUserItems.filter((item) => item.id !== deletedItem.id);
    setCurrentUserItems(updatedListOfCurrentUserItems)
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

    const updatedCurrentItem = currentUserItems.map(item => {
      if(item.id === editedItem.id){
        return editedItem;
      } else {
        return item;
      }
    })
    setCurrentUserItems(updatedCurrentItem)
  }

  return (
    <BrowserRouter>
      <NavBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser}/>} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/items" element={<ItemsListPage users={users} locations={locations} />} />
        <Route path='/items/new' element={<AddItemPage handleAddItem={handleAddItem} locations={locations} currentUser={currentUser} />} />
        <Route path='/items/:id/edit' element={<EditItemPage editItem={editItem} handleEditedItem={handleEditedItem} locations={locations} currentUser={currentUser} />} />
        <Route path='/items/locations' element={<ItemsListByLocationPage users={users} locations={locations} />} />
        <Route path='/users/:id/items' element={<CurrentUserItemsPage currentUserItems={currentUserItems} removeItemFromItems={removeItemFromItems} setEditItem={setEditItem} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
