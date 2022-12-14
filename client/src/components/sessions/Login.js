import { useState } from 'react'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
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