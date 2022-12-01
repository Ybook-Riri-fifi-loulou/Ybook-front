import React, { SyntheticEvent, useRef, useState } from 'react'
import userPool from '../UserPool';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

export interface RegisterPageProps {}

const Register: React.FC<RegisterPageProps> = () => {
  const [name, setName] = useState('');
  const [givenName, setGivenName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  let cognitoUser = useRef<AmazonCognitoIdentity.CognitoUser>();

  const handleSubmit = (e : SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email", Value:email});
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name", Value: name});
    var attributeGivenName = new AmazonCognitoIdentity.CognitoUserAttribute({Name:'given_name', Value:givenName});
    var attributeList: AmazonCognitoIdentity.CognitoUserAttribute[] = [];
    attributeList.push(attributeEmail);
    attributeList.push(attributeName);
    attributeList.push(attributeGivenName);

    userPool.signUp(email, password, attributeList, null as any, function(
      err,
      result
    ) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      cognitoUser.current = result?.user;
      console.log('user name is ' + cognitoUser.current?.getUsername());
    });
  }

  const handleConfirmCode = (e : SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cognitoUser.current);
    cognitoUser.current?.confirmRegistration(code, true, function(err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result :' + result);
    });
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Last Name</label>
          <input type="text" name="name" id="name" onChange={(e) => setName(e.currentTarget.value)} value={name} required/>
          <label htmlFor="given_name">First Name</label>
          <input type="text" name="given_name" id="given_name" onChange={(e) => setGivenName(e.currentTarget.value)} value={givenName} required/>
          <label htmlFor="email">Email</label>
          <input name='email' type="email" onChange={(e) => setEmail(e.currentTarget.value)} value={email} required/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.currentTarget.value)} value={password} required/>
          <button type='submit'>submit</button>
        </form>
      </div>
      <br />
      <div>
        <form onSubmit={handleConfirmCode}>
          <label htmlFor="code">Confirmation code</label>
          <input type="text" name='code' id='code' onChange={(e) => setCode(e.currentTarget.value)} value={code} required/>
          <button type="submit">Confirmer</button>
        </form>
      </div>
    </>
  )
}

export default Register