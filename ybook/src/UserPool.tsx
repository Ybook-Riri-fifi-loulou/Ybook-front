import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

var pooldata = {
	UserPoolId: 'eu-west-3_Iekd8jDeb',
	ClientId: '7llslfb09dtag2h7117og3ku72'
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(pooldata);
export const userData = {
	Username: 'test',
	Pool: userPool,
};

export default userPool;