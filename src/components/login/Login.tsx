import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './style.scss';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = React.useContext(AuthContext);

  const handleEmailChange = (e: any) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const userLogin = async (e: any) => {
    e.preventDefault();

    // const email = (document.getElementById('email') as HTMLInputElement).value;
    // const password = (document.getElementById('password') as HTMLInputElement)
    //   .value;

    // if (email.trim() !== '' && password.trim() !== '') {
    // localStorage.setItem('TOKEN', `${token}`);
    // navigate('/Dashboard');
    //   console.log(email, password);
    // } else {
    //   alert('Please fill in both email and password to access');
    // }

    console.log(email, Number(password.trim()));

    // TO SEND THE FORM DATA, WE SEND IT LIKE THIS WRAPPED IN FORMDATA..
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post(
        'http://assignment.cyberboxer.com/auth/login',
        formData
      );
      console.log('MESSAGE', response.data.message);
      // console.log('TOKEN', response.data.data.token);

      // SETTING THE VARIABLES FOR SWITCHING THE ROUTES AFTER LOGIN
      localStorage.setItem(
        'login',
        JSON.stringify({
          login: true,
          token: response.data.data.token,
        })
      );
      // SETTING FOR AUTHPROVIDER ACCESS SO IT COULD BE ACCESSIBLE IN DASHBOARD PAGE.
      setToken(response.data.data.token);
      navigate('/Dashboard');
    } catch (error) {
      console.log('Invalid credentials');
    }

    // !

    // try {
    //   const response = await axios.post(
    //     'http://assignment.cyberboxer.com/auth/login',
    //     { email: email, password: password },
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         'Access-Control-Allow-Origin': '*',
    //       },
    //     }
    //   );
    //   if (response.data.success) {
    //     const token = response.data.token;
    //     console.log('Token:', token);
    //   } else {
    //     console.log('Invalid credentials');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <div className='login' onSubmit={userLogin}>
        <form className='form'>
          <label htmlFor='email'>
            <input
              id='email'
              type='email'
              value={email}
              placeholder='Your Email'
              onChange={handleEmailChange}
            />
          </label>
          <label htmlFor='password'>
            <input
              id='password'
              type='password'
              value={password}
              placeholder='Your Password'
              onChange={handlePasswordChange}
            />
          </label>
          <input type='submit' value={'Login'} className='btn' />
        </form>
      </div>
    </>
  );
};

export default Login;
