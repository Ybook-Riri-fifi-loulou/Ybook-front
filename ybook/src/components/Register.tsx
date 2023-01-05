import React, { SyntheticEvent, useRef, useState } from 'react'
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import logo from '../logo.png';
import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export interface RegisterPageProps {}

const Register: React.FC<RegisterPageProps> = () => {
  const [name, setName] = useState('');
  const [givenName, setGivenName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser } = useAuth();

  const handleSubmit = (e : SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email", Value:email});
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name", Value: name});
    var attributeGivenName = new AmazonCognitoIdentity.CognitoUserAttribute({Name:'given_name', Value:givenName});
    var attributeList: AmazonCognitoIdentity.CognitoUserAttribute[] = [];
    attributeList.push(attributeEmail);
    attributeList.push(attributeName);
    attributeList.push(attributeGivenName);

    registerUser(email,password, attributeList)
  }

  return (
    <>
      <div className='register'>
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
              <form className='login-form' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className='login-form__label form-label'>Last Name</label>
                  <input type="text" className='login-form__input form-control' name="name" id="name" onChange={(e) => setName(e.currentTarget.value)} value={name} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="given_name" className='login-form__label form-label'>First Name</label>
                  <input type="text" className='login-form__input form-control' name="given_name" id="given_name" onChange={(e) => setGivenName(e.currentTarget.value)} value={givenName} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className='login-form__label form-label'>Email</label>
                  <input name='email' className='login-form__input form-control' type="email" onChange={(e) => setEmail(e.currentTarget.value)} value={email} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className='login-form__label form-label'>Password</label>
                  <input type="password" className='login-form__input form-control' name="password" id="password" onChange={(e) => setPassword(e.currentTarget.value)} value={password} required/>
                </div>
                <button type='submit' className='btn btn-primary login-form__submit'>Créer mon compte</button>
              </form>
              <span className='login-redirect'>Déjà un compte ?<Link to='/login'>Connectez-vous</Link></span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register