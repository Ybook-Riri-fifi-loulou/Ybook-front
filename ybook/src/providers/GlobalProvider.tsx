import React, {PropsWithChildren, useRef, createContext, useContext, useState, useEffect, SetStateAction} from 'react';
import userPool from '../UserPool';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { User } from '../hooks/useAuth';

const email_saved = localStorage.getItem('email_saved');
// console.log('email : ' + email_saved);

export type AuthContextType = {
  currentUser?: AmazonCognitoIdentity.CognitoUser;
  setCurrentUser: React.Dispatch<SetStateAction<AmazonCognitoIdentity.CognitoUser | undefined>>;
  userInfo?: User;
  setUserInfo: React.Dispatch<SetStateAction<User | undefined>>;
  sessionVality: (session: AmazonCognitoIdentity.CognitoUserSession) => void;
}

const GlobalContext = createContext<AuthContextType>(null!);

export const GlobalProvider = ({ children }: PropsWithChildren<unknown>) => {
  let [currentUser, setCurrentUser] = useState<AmazonCognitoIdentity.CognitoUser>();
  let [userInfo, setUserInfo] = useState<User | undefined>();
  let cognitoUser = useRef(userPool.getCurrentUser());

  const sessionVality =  (session: AmazonCognitoIdentity.CognitoUserSession) => {
    if (session?.isValid()) {
       fetch(`http://localhost:3100/user/${email_saved}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token_local")}`
          }
        })
        .then(response => response.json())
        .then(data => {
          setUserInfo(data);
        });
    }
  }

  

  useEffect(() => {
    if (cognitoUser.current != null) {
      cognitoUser.current.getSession((err: Error, session: null | AmazonCognitoIdentity.CognitoUserSession) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }

        cognitoUser.current!.getUserAttributes(function (err, attributes) {
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

        sessionVality(session!);
      });
    }
  }, []);

  const contextData = {
    currentUser,
    setCurrentUser,
    userInfo,
    setUserInfo,
    sessionVality
  }

  return (
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext);

