import React from "react";
import { useMsal } from "@azure/msal-react";
import loginRequest from '../config';

async function handleLogin(instance) {
    try {
        await instance.loginPopup(loginRequest);
    }
    catch (err) {
        console.error(err);
    }

}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <button onClick={() => handleLogin(instance)}>Sign In Using Microsoft Account </button>
    );
}