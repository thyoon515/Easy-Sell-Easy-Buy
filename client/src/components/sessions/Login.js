import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((r) => r.json())
      .then((user) => 
      onLogin(user));
      navigate('/');
    }
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }


  return (
    <form onSubmit={handleLoginSubmit}>
        <label>
          Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
      <br />
        <label>
          Password:
            <input type="password" value={password} onChange={handlePasswordChange
            } />
        </label>
      <br />
        <button type='submit'>Login</button>
    </form>
  )
}

export default Login