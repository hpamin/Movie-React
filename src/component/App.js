import logo from '../logo.svg';
import '../App.css';
import { useEffect, useState } from 'react';
import Body from './Body';
import UserProvider from './Context/UserContext';

// { showLogIn ? showSignIn ? <LogIn  setShowLogIn = {setShowLogIn} setShowSignIn = {setShowSignIn} /> : <SignUp setShowLogIn = {setShowLogIn} setShowSignIn = {setShowSignIn} /> : <LogIn setShowLogIn = {setShowLogIn} setShowSignIn = {setShowSignIn}  /> }

function App() {
useEffect(()=>{
  console.log(window.innerWidth);
},[window.innerWidth])

return (
  <UserProvider>
      <Body />
  </UserProvider>
);
  
}

export default App;

