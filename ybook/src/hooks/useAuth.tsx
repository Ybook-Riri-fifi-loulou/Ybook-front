import React, {PropsWithChildren, useRef, createContext, useContext, useState} from 'react';
import userPool from '../UserPool';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { useGlobal } from '../providers/GlobalProvider';
import { useNavigate } from 'react-router-dom';
export type User = {
  email : string;
  firstname : string;
  lastname : string;
}

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
        console.log('access token + ' + result.getIdToken().getJwtToken());
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
      navigate('/');
    });
  }

  return {loginUser, registerUser, confirmRegister}
}

export default useAuth