import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';
function Login() {

  const navigate = useNavigate();


  const [Email, setEmail] = useState();
  const [PasswordHash, setPassword] = useState();

  const [loggedInUser, setLoggedInUser] = useState();

  const handleLogin = () => {
    loginUser(Email, PasswordHash);
  };

  const loginUser = async (Email, PasswordHash) => {
    try {
      const response = await fetch('http://localhost:3300/admin-login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, PasswordHash })
      });
      const loginData = await response.json();
      if (loginData.success) {
        setLoggedInUser(loginData.data);
        localStorage.setItem('loggedIn', loginData.success);
        localStorage.setItem('loggedUser', JSON.stringify(loginData.data));
        navigate('/');
      }else{
        alert('Error in details');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="login">
      <form className='login-form'>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>
                <h2>Admin Login</h2>
              </td>
            </tr>
            <tr>
              <td><lable>Email</lable></td>
              <td><input type='email' onChange={(e) => setEmail(e.target.value)} /></td>
            </tr>
            <tr>
              <td><lable>Password</lable></td>
              <td><input type='password' onChange={(e) => setPassword(e.target.value)} /></td>

            </tr>
            <tr>
              <td><input type='reset' value='Reset' /></td>
              <td><input type='button' value='Login' onClick={handleLogin} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
export default Login;
