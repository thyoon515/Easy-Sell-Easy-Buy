import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navigation/NavBar';
import HomePage from "./components/static/HomePage";
import Login from "./components/sessions/Login";
import Signup from "./components/sessions/Signup";

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/me').then((response) => {
      if (response.ok) {
        response.json().then((user) => {setCurrentUser(user) && setUserLoggedIn(true)});
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <NavBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} setUserLoggedIn={setUserLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
