import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState([]);
  

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password, 
      email,
      phoneNumber
    }
    fetch(`/users`, {
      method: "POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(user)
    })
    .then(res => {
      if(res.ok){
          res.json().then(navigate('/'))
      }else{
          res.json().then((e) => {
            setErrors(e.errors)
          })
      }
    })
  }

  return (
    <form onSubmit={handleSignupSubmit}>
      <label>
        Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br/>
      <label>
        Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br/>
      <label>
        Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br/>
      <label>
        Phone #:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br/>
      <button type='submit'>Signup</button>
      <br/>
        <div>
          {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          )}
        </div>
        
    </form>
  )
}

export default Signup