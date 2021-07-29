import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import MSAL_CONFIG from './config';


import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
const initialState = {
  username: null,
  uid: null,
}
const userReducer = function (state = initialState, action) {
  
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, ...action.payload }
    case 'LOGOUT':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, ...action.payload }
    default:
      return { ...state };
  }

}
const rootReducer = combineReducers({
  user: userReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))
const msalInstance = new PublicClientApplication(
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
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </BrowserRouter> </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
