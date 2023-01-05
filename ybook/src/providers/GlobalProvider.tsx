import React, {PropsWithChildren, useRef, createContext, useContext, useState} from 'react';
import userPool from '../UserPool';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

export type AuthContextType = {
  currentUser?: AmazonCognitoIdentity.CognitoUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<AmazonCognitoIdentity.CognitoUser | undefined >>;
}

const GlobalContext = createContext<AuthContextType>(null!);


export const GlobalProvider = ({ children } : PropsWithChildren<unknown>) => {
  let [currentUser, setCurrentUser] = useState<AmazonCognitoIdentity.CognitoUser>();

  const contextData = {
    currentUser,
    setCurrentUser
  }

  return (
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext);

