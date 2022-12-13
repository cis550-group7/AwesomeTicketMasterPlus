import React from "react";
import { Form, FormInput, FormGroup } from "shards-react";
import MenuBar from '../components/MenuBar';

function RegisterPage() {

    return (
      <div>
      <MenuBar />
      <Form style={{ width: '40vw', margin: '0 auto', marginTop: '5vh' }}>
      <FormGroup>
        <label htmlFor="#name">Name</label>
        <FormInput id="#name" placeholder="Name" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#username">Username</label>
        <FormInput id="#username" placeholder="Username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Password</label>
        <FormInput type="password" id="#password" placeholder="Password" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#dob">Date of Birth</label>
        <FormInput type="date" id="#dob" placeholder="DOB" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#email">Email</label>
        <FormInput type="email" id="#email" placeholder="Email" />
      </FormGroup>
    </Form>
    </div>
    );
}

export default RegisterPage