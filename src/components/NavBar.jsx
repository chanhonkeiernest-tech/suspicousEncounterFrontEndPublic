import { NavLink } from "react-router-dom";
import { useState } from "react";


const NavBar = () => {


 

  return (
    <nav className="navbar">
      <NavLink to="/">Current encounter</NavLink>
      <NavLink to="/NewEncounter"> Create new encounter</NavLink>
      <NavLink to="/mergeRequest"> Show pending request</NavLink>
      <NavLink to="/MyEncounters"> Show my post</NavLink>
      <NavLink to="/login"> Login</NavLink>
      <NavLink to="/register"> register</NavLink>
      
      
    </nav>
  );
};

export default NavBar;