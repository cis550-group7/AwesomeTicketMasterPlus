import React from "react";
import { useState } from 'react';
import { Form, Button, FormInput, FormGroup } from "shards-react";
import MenuBar from '../components/MenuBar';
import { getUser } from "../fetcher";
import { useSelector, useDispatch} from 'react-redux'
import {updateCurrentUser, selectCurrentUser} from './currentUserSlice'
import { Redirect } from "react-router-dom";


function LoginPage() {
  const [authenticated, setAuthen] = useState(false);
  const stateCurrentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [newInput, setInput] = useState({ username: "", password: "" });

  if(authenticated){
    return <Redirect replace to={'/users'} />;
  }

  const submitHandler = async(e) => {
    e.preventDefault();

    let response = await getUser(JSON.stringify(newInput.username));
    let user = response.results[0]
 
    if(user === undefined){
      alert("Login failed due to unknown username!")
    }else{
        if(user.password===newInput.password){
        dispatch(updateCurrentUser(user));
        alert("Login Success!"); 
        setAuthen(true);
        }else{
          alert("password incorrect!")
        }
    }

  }

  const changeHandler = (e) => {
    if (e.target.id === "username") {
      setInput((state) => ({
        username: e.target.value,
        password: state.password,
      }));
    }
    if (e.target.id === "password") {
      setInput((state) => ({
        username: state.username,
        password: e.target.value,
      }));
    }
  }

    return (
      <div>
      <MenuBar />
      <Form style={{ width: '40vw', margin: '0 auto', marginTop: '5vh' }} onSubmit={submitHandler}>
      <FormGroup>
        <label htmlFor="#username">Username</label>
        <FormInput id="username" placeholder="Username" onChange={changeHandler}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Password</label>
        <FormInput type="password" id="password" placeholder="Password" onChange={changeHandler}/>
      </FormGroup>
      <Button theme="info" type="submit">
        Login
      </Button>
    </Form>
    </div>
    );
}

export default LoginPage