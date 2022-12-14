import React, { useState } from 'react';
import { Form, Button, FormInput, FormGroup } from "shards-react";
import MenuBar from '../components/MenuBar';
import { createNewUser} from '../fetcher';


function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');

  const submitHandler = async(e) => {
    e.preventDefault();
    console.log(name, username, password, dob, email)
    try{
      await createNewUser(name, username, password, dob, email);
      alert("Register success with username: " + username);    
    }catch(err){
        alert("register adding a new user failed: " +  err);
    }
  }

    return (
      <div>
      <MenuBar />
      <Form style={{ width: '40vw', margin: '0 auto', marginTop: '5vh' }} onSubmit={submitHandler}>
      <FormGroup>
        <label htmlFor="#name">Name</label>
        <FormInput id="#name" placeholder="Name" onChange={e => setName(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="#username">Username</label>
        <FormInput id="#username" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Password</label>
        <FormInput type="password" id="#password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="#dob">Date of Birth</label>
        <FormInput type="date" id="#dob" placeholder="DOB" onChange={e => setDOB(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <label htmlFor="#email">Email</label>
        <FormInput type="email" id="#email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
      </FormGroup>
      <Button theme="info" type="submit">
        Register
      </Button>
    </Form>
    </div>
    );
}

export default RegisterPage