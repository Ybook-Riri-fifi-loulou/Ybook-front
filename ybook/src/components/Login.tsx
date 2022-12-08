import React, { SyntheticEvent, useRef, useState } from 'react'
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { getUserData } from '../UserPool';

export interface LoginPageProps { }

const Login: React.FC<LoginPageProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = getUserData(email);
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: email,
        Password: password,
      }
    );

    // Username : falcatiremi@gmail.com
    // Password : aaAA11++

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
      },

      onFailure: function (err) {
        alert(err);
      },
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.currentTarget.value)} value={email} required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.currentTarget.value)} value={password} required />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login