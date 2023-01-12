import React, {PropsWithChildren, useRef, createContext, useContext, useState} from 'react';
import userPool from '../UserPool';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { useGlobal } from '../providers/GlobalProvider';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const useAuth = () => {
  let cognitoUser = useRef<AmazonCognitoIdentity.CognitoUser>();
  const {currentUser, setCurrentUser} = useGlobal()
  const navigate = useNavigate();

  const registerUser = (email: string, password: string, attributeList: AmazonCognitoIdentity.CognitoUserAttribute[]) => {
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
      setCurrentUser(result?.user);
      navigate('/confirmation');
    });
  }

  const loginUser = (cognitoUser : AmazonCognitoIdentity.CognitoUser, authenticationDetails : AmazonCognitoIdentity.AuthenticationDetails) => {
    cognitoUser?.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const token = result.getIdToken().getJwtToken();
        const tokenJSON = JSON.stringify(token);
        console.log(tokenJSON);
        const decodedToken: any = jwt_decode(token);
        console.log(decodedToken);
        // if (window.location.pathname === '/login?confirmed=true') {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token : token })
          };

          fetch('http://localhost:3100/user/', requestOptions) 
            .then(response => response.json())
            .then(data => {
              console.log(data);
              navigate('/');
            });
        // }
      },

      onFailure: function (err) {
        alert(err);
      },
    });
  }

  const confirmRegister = (code: string) => {
    currentUser?.confirmRegistration(code, true, function(err : any, result:any) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result :' + result);
      navigate('/login?confirmed=true');
    });
  }

  return {loginUser, registerUser, confirmRegister}
}

export default useAuth