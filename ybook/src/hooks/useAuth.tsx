import React, { PropsWithChildren, useRef, createContext, useContext, useState } from 'react';
import userPool from '../UserPool';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { useGlobal } from '../providers/GlobalProvider';
import { redirect, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

const useAuth = () => {
  let cognitoUser = useRef<AmazonCognitoIdentity.CognitoUser>();
  const { currentUser, setCurrentUser, setUserInfo } = useGlobal()
  const navigate = useNavigate();


  const registerUser = (email: string, password: string, attributeList: AmazonCognitoIdentity.CognitoUserAttribute[]) => {
    userPool.signUp(email, password, attributeList, null as any, function (
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

  const loginUser = (cognitoUser: AmazonCognitoIdentity.CognitoUser, authenticationDetails: AmazonCognitoIdentity.AuthenticationDetails) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const token = result.getIdToken().getJwtToken();
        const decodedToken: any = jwt_decode(token);
        // const user_email = decodedToken['email'];
        // localStorage.setItem('email_saved', user_email);
        // console.log(user_email);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
          };

          cognitoUser.getUserAttributes(function (err, attributes) {
          if (err) {
            console.log(err);
          } else {
            attributes?.forEach(attribute => {
              if (attribute.getName() === 'email') {
                const user_email = attribute.getValue();
                localStorage.setItem('email_saved', user_email);
              }
            });
          }
        });

          fetch('http://localhost:3100/user/', requestOptions)
            .then(response => response.json())
            .then(data => {
              setUserInfo(data);
              navigate('/');
            });



      },
      
      onFailure: function (err) {
        alert(err);
      },
    });
  }

  const confirmRegister = (code: string) => {
    currentUser?.confirmRegistration(code, true, function (err: any, result: any) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result :' + result);
      navigate('/login?confirmed=true');
    });
  }

  const getCurrentUser = () => {
    let cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err: any, session: any) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        // console.log('session validity: ' + session.isValid());

        if (session.isValid()) {
          setCurrentUser(cognitoUser);
        }

        cognitoUser?.getUserAttributes(function (err, attributes) {
          if (err) {
            
          } else {
            
          }
        });
      });
    }
  }

  return { loginUser, registerUser, confirmRegister, getCurrentUser }
}

export default useAuth