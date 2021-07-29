import React from 'react';
import Cookies from 'js-cookie';
import { PublicClientApplication } from "@azure/msal-browser";
import MSAL_CONFIG from './config';

let publicClientApplicationObj = new PublicClientApplication(
  {
    auth: {
      clientId: MSAL_CONFIG.appId,
      redirectUri: MSAL_CONFIG.redirectUri,
      authority: MSAL_CONFIG.authority
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
    }
  });

export default class App extends React.Component {


  state = {
    isAuthenticated: false,
    data: null
  }

  login = async () => {
    try {

      let data = await publicClientApplicationObj.loginPopup({
        scopes: MSAL_CONFIG.scopes,
        prompt: "select_account",
      })

      this.setState({ isAuthenticated: true, data })
    }
    catch (err) {
      console.log(err)
      //this.setState({ isAuthenticated: false })
    }
  }

  logout = async () => {
    try {

      let data = await publicClientApplicationObj.logoutRedirect()
      this.setState({ isAuthenticated: false, data: null })
    }
    catch (err) {
      console.log(err)
    }
  }

  render() {

    if (this.state.isAuthenticated) {
      return (
        <>
          <div>Name: {this.state.data.account.name}</div>
          <div>Username: {this.state.data.account.username}</div>
          <div>access Token:
          </div>
          <div>
            <textarea rows="10" cols="50">
              {this.state.data.accessToken}
            </textarea>
          </div>
          <button onClick={this.logout}>Logout</button>
        </>
      )
    }

    return (
      <React.Fragment>
        Hello please login to continue
        <button onClick={this.login}>Login</button>
      </React.Fragment>
    );
  }
}
