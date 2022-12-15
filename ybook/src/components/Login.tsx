import React, { SyntheticEvent, useRef, useState } from 'react'
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { getUserData } from '../UserPool';
import logo from '../logo.png';
import {Link} from 'react-router-dom';

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
    <div className='login'>
      <div className="container">
        <div className="row justify-content-center">
          <div className="login-image">
            <img className='login-img img-fluid' src={logo} alt="logo" width={150}/>
          </div>
          <div className="login-header">
            <h1 className='login-header__title'>Bienvenue sur Ybook</h1>
            <span className='login-header__subtitle'>Le tout nouveau réseau social</span>
          </div>
          <div className="col-9 col-md-7 col-lg-6">
            <form className='login-form' onSubmit={handleLogin}>
              <div className="mb-3">
                <label className='login-form__label form-label' htmlFor="email">Email</label>
                <input className='login-form__input form-control' type="email" name="email" id="email" onChange={(e) => setEmail(e.currentTarget.value)} value={email} required />
              </div>
              <div className="mb-3">
                <label className='login-form__label form-label' htmlFor="password">Password</label>
                <input className='login-form__input form-control' type="password" name="password" id="password" onChange={(e) => setPassword(e.currentTarget.value)} value={password} required />
              </div>
              <Link to='/forgot-password' className='login-form__forgot'>Mot de passe oublié</Link>
              <button type='submit' className='btn btn-primary login-form__submit'>Se connecter</button>
            </form>
            <span className='login-redirect'>Pas de compte ?<Link to='/register'>Inscrivez-vous</Link></span>
          </div>
          {/* example : https://dribbble.com/shots/18890725-Log-in-page-Untitled-UI */}
        </div>
      </div>
    </div>
  )
}

export default Login