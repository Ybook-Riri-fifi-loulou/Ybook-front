import React, {PropsWithChildren, useRef, createContext, useContext, useState} from 'react';
import userPool from '../UserPool';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

export type AuthContextType = {
  currentUser?: AmazonCognitoIdentity.CognitoUser;
  registerUser: (email: string, password: string, attributeList: AmazonCognitoIdentity.CognitoUserAttribute[])=>void;
  loginUser: (cognitoUser : AmazonCognitoIdentity.CognitoUser ,authenticationDetails : AmazonCognitoIdentity.AuthenticationDetails)=>void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children } : PropsWithChildren<unknown>) => {
  let cognitoUser = useRef<AmazonCognitoIdentity.CognitoUser>();
  let [currentUser, setCurrentUser] = useState<AmazonCognitoIdentity.CognitoUser>();

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
    });
  }

  const loginUser = (cognitoUser : AmazonCognitoIdentity.CognitoUser, authenticationDetails : AmazonCognitoIdentity.AuthenticationDetails) => {
    cognitoUser?.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('access token + ' + result.getIdToken().getJwtToken());
      },

      onFailure: function (err) {
        alert(err);
      },
    });
  }

  const contextData = {
    currentUser,
    registerUser,
    loginUser
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);