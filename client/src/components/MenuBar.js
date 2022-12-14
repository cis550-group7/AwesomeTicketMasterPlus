import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
  } from "shards-react";
  import { NavLink } from "react-router-dom";

  import {useSelector, useDispatch} from 'react-redux'
  import {updateCurrentUser, selectCurrentUser, logoutAction} from '../pages/currentUserSlice'

function User(props){
    const stateCurrentUser = useSelector(selectCurrentUser);
    if (stateCurrentUser.id !== -1){
        
    }
    return <>{"[" + stateCurrentUser.id + "] " + stateCurrentUser.username}</>
  }

  function MenuBar() {
    const dispatch = useDispatch();
    const stateCurrentUser = useSelector(selectCurrentUser);

    const handleLinkOnClick= (e) => {
      dispatch(logoutAction());
      alert("Logged out")
    };
    
        return (
            <Navbar type="dark" theme="info" expand="md">
        <NavbarBrand>Awesome Ticketmaster Plus</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink to='/' style={{color: "white", verticalAlign: "sub", paddingRight: "1rem"}}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/users" style={{color: "white", verticalAlign: "sub", paddingRight: "1rem"}}>
                Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/artists" style={{color: "white", verticalAlign: "sub", paddingRight: "1rem"}}>
                Artists
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/events" style={{color: "white", verticalAlign: "sub", paddingRight: "1rem"}}>
                Events
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/register" style={{color: "white", verticalAlign: "sub", paddingRight: "1rem"}}>
                Register
              </NavLink>
            </NavItem>
            <NavItem>
            {(stateCurrentUser.id===-1) && 
              <NavLink to="/login" style={{color: "white", verticalAlign: "sub", paddingRight: "2rem"}}>
                Login
              </NavLink>}
              {!(stateCurrentUser.id===-1) && 
              <NavLink to="/login" onClick={handleLinkOnClick} style={{color: "white", verticalAlign: "sub", paddingRight: "2rem"}}>
                Log out
              </NavLink>}
            </NavItem>
            <NavbarBrand>Logged in as: <User /> </NavbarBrand>
          </Nav>
      </Navbar>
        )
    
}

export default MenuBar