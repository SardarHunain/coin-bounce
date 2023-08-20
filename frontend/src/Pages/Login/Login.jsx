import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../api/internal';

export default function Login() {

  const handleLogin = async ()=>{

    const data = {
      username: 
    }
    const response = await login(data)
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    setUsernameError('');
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.length < 5 || username.length > 30) {
      setUsernameError('Username should have between 5 and 30 characters.');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password should be at least 8 characters long.');
      return;
    }

    // If validation passes, you can proceed with login logic here
    // For now, let's just log the successful submission
    console.log('Login successful');
  };

  return (
    <>
      <h1 className='container text-center text-light'>Login to your Account</h1>
      <div>
        <form className='container' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label text-light">Username</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={username}
              onChange={handleUsernameChange}
            />
            {usernameError && <div className="text-danger">{usernameError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <div className="text-danger">{passwordError}</div>}
          </div>
          <div className='d-grid gap-2 col-6 mx-auto'>
            <button type="submit" className="btn btn-outline-success" onClick={handleLogin}><b>Login</b></button>
          </div>
        </form>
      </div>
      <div className='d-grid gap-2 col-4 mx-auto text-light'>
        <p>Don't have an account? <span><Link className="nav-link text-info" to="signup"><u>SignUp</u></Link></span></p>
      </div>
    </>
  );
}
