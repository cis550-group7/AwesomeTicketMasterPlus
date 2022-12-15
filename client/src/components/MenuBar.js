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
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

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
          <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
          <CDBSidebar textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a className="text-decoration-none" style={{ color: 'inherit' }}>
                Ticketmaster Plus
              </a>
            </CDBSidebarHeader>
    
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavItem>
                  <NavLink exact to="/" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink exact to="/artists" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="sticky-note">Artists</CDBSidebarMenuItem>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink exact to="/events" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="table">Events</CDBSidebarMenuItem>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink exact to="/users" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink exact to="/register" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="book">Register</CDBSidebarMenuItem>
                  </NavLink>
                </NavItem>

                <NavItem>
                {(stateCurrentUser.id===-1) && 
                  <NavLink to="/login" style={{color: "white", verticalAlign: "sub", paddingRight: "2rem"}}>
                    <CDBSidebarMenuItem icon="gamepad">Login</CDBSidebarMenuItem>
                  </NavLink>}
                  {!(stateCurrentUser.id===-1) && 
                  <NavLink to="/login" onClick={handleLinkOnClick} style={{color: "white", verticalAlign: "sub", paddingRight: "2rem"}}>
                    <CDBSidebarMenuItem icon="gamepad">Log out</CDBSidebarMenuItem>
                  </NavLink>}
                </NavItem>
              </CDBSidebarMenu>
            </CDBSidebarContent>
    
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '20px 5px',
                }}
              >
                Group 7
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>

          /*
      <Navbar type="dark" theme="warning" expand="md" className="sidebar">
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
      */
        )
    
}

export default MenuBar