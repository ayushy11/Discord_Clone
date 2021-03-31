import React from 'react';
import { auth, provider } from './firebase';
import { Button } from '@material-ui/core';
import './Login.css';
import discordLogo from './assets/discord-logo.svg';

function Login() {
    const signIn = () =>{
        //login
        auth.signInWithPopup(provider).catch((error) => alert(error.message));    
    };

    return (
        <div className="login">            
            <div className="login__logo">
                <img 
                    src={discordLogo}
                    alt="logo"                       
                />
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login;
