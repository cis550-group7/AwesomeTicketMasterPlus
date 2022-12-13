import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "shards-react";

  import {useSelector, useDispatch} from 'react-redux'
  import {updateCurrentUser, selectCurrentUser} from '../pages/currentUserSlice'

function User(props){
    const stateCurrentUser = useSelector(selectCurrentUser);
    if (stateCurrentUser.id !== -1){
        
    }
    return <>{"[" + stateCurrentUser.id + "] " + stateCurrentUser.username}</>
  }

  function MenuBar() {
    const stateCurrentUser = useSelector(selectCurrentUser);
        return (
            <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">Awesome Ticketmaster Plus</NavbarBrand>
          <Nav navbar>
          <NavItem>
              <NavLink active href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/users">
                Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/artists">
                Artists
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/events" >
                Events
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/register" >
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active  href="/login" >
                {(stateCurrentUser.id===-1) && "Login"}
                {!(stateCurrentUser.id===-1) && "Log out"}
              </NavLink>
            </NavItem>
            <NavbarBrand href="/" style={{paddingLeft: "2rem"}}>Logged in as: <User /> </NavbarBrand>
          </Nav>
      </Navbar>
        )
    
}

export default MenuBar