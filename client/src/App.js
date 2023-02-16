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
import CurrentUserItems from './components/items/CurrentUserItems';

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
        <Route path="/items" element={<Items editItem={editItem} items={items} removeItemFromItems={removeItemFromItems} setEditItem={setEditItem} userInfo={userInfo} />} />
        <Route path='/items/new' element={<AddItem handleAddItem={handleAddItem} locations={locations} currentUser={currentUser} />} />
        <Route path='/items/:id/edit' element={<EditItem editItem={editItem} handleEditedItem={handleEditedItem} locations={locations} currentUser={currentUser} />} />
        <Route path='/items/locations' element={<FilterItems items={items} />} />
        <Route path='/users/:id/items' element={<CurrentUserItems currentUserItems={currentUserItems} currentUser={currentUser} removeItemFromItems={removeItemFromItems} setEditItem={setEditItem} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
