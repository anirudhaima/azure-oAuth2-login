import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { PageLayout } from "./components/PageLayout";
import loginRequest from './config';
import { Switch,Route  } from "react-router-dom";
import Home from "./containers/Home";

function ProfileContent() {
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = React.useState(null);

    React.useEffect(()=>{
        RequestAccessToken()
    },[]);

    const name = accounts[0]?.name;
    const username = accounts[0]?.username;
    
    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        instance.acquireTokenSilent(request).then((response) => {
            console.log(response)
            setAccessToken(response.accessToken);
        })
    }

    return (
        <>
            <h5>Welcome {name}</h5>
            <h5>{username}</h5>
            {/* <h5>Access token</h5>
            <div >
                {accessToken}
            </div> */}
        </>
    );
};


function App() {

    return (
        <PageLayout>
            <AuthenticatedTemplate>
                <ProfileContent />
                <Switch>
                    <Route path="/home" exact component={Home} />
                </Switch>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>You are not signed in! Please sign in.</p>
            </UnauthenticatedTemplate>
        </PageLayout>
    );
}

export default App;