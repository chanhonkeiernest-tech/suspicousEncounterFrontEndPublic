import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLogin } from '../context/LoginContext'

const NavBar = () => {
  const {  isAuthenticated } = useLogin()

 

  return (
    <nav className="navbar">
      <NavLink to="/">Current encounter</NavLink>
      <NavLink to="/NewEncounter"> Create new encounter</NavLink>
      <NavLink to="/mergeRequest"> Show pending request</NavLink>
      <NavLink to="/MyEncounters"> Show my post</NavLink>
      {isAuthenticated===false &&<NavLink to="/login"> Login</NavLink>}
      {isAuthenticated===false &&<NavLink to="/register"> register</NavLink>}
      {isAuthenticated===true && <NavLink to="/logout"> logout</NavLink>}
      
      
    </nav>
  );
};

export default NavBar;