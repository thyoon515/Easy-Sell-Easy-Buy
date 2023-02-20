import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navigation/NavBar';
import HomePage from "./components/static/HomePage";
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";
import ItemsPage from './components/items/ItemsPage';
import AddItemPage from './components/items/AddItemPage';
import EditItemPage from './components/items/EditItemPage';
import FilterItemsPage from './components/items/FilterItemsPage';
import CurrentUserItemsPage from './components/items/CurrentUserItemsPage';

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState([]);
  const [locations, setLocations] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [currentUserItems, setCurrentUserItems] = useState([]);

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
      .then((itemData) => {
        setItems(itemData);
        const filterCurrentUserItems = itemData.filter((item) => item.user_id === currentUser.id);
        setCurrentUserItems(filterCurrentUserItems);
      })
  },[currentUser.id])

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
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/items" element={<ItemsPage editItem={editItem} items={items} removeItemFromItems={removeItemFromItems} setEditItem={setEditItem} userInfo={userInfo} />} />
        <Route path='/items/new' element={<AddItemPage handleAddItem={handleAddItem} locations={locations} currentUser={currentUser} />} />
        <Route path='/items/:id/edit' element={<EditItemPage editItem={editItem} handleEditedItem={handleEditedItem} locations={locations} currentUser={currentUser} />} />
        <Route path='/items/locations' element={<FilterItemsPage items={items} />} />
        <Route path='/users/:id/items' element={<CurrentUserItemsPage currentUserItems={currentUserItems} currentUser={currentUser} removeItemFromItems={removeItemFromItems} setEditItem={setEditItem} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
