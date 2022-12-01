import React from 'react'
import AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { userData } from '../UserPool';

export interface LoginPageProps {}

const Login : React.FC<LoginPageProps> = () => {
  var authenticationData = {
    Username : '...', // your username here
    Password : '...', // your password here
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
    },

    onFailure: function(err) {
      alert(err);
    },

    mfaRequired: function(codeDeliveryDetails) {
      var verificationCode = prompt('Please input verification code' ,'');
      cognitoUser.sendMFACode(verificationCode as any, this);
    }
  });

  return (
    <div>Login</div>
  )
}

export default Login