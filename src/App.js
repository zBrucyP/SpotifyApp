import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import './App.css';


function App() {

    const getParam = (searchParam) => {
        var query = window.location.hash.substr(1); // get param section
        var params = query.split("&");
        for (var i=0; i < params.length; i++) {
            var pair = params[i].split('=');
            if (pair[0] === searchParam) {
                return pair[1];
            }
        }
        return false;
    }

    const [accessToken, setAccessToken] = useState(() => getParam('access_token'));
    const [refreshToken, setRefreshToken] = useState(() => getParam('refresh_token'));
    const [loggedIn, setLoggedIn] = useState(accessToken ? true : false);
    const [profile, setProfile] = useState(null);


    useEffect ( () => {
        async function fetchSpotifyMe() {
            try {
                const response = await fetch('https://api.spotify.com/v1/me', { // get profile data
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
                if (response.status === 200) { // request returned successfully
                    const data = await response.json();
                    setProfile(data);
                    console.log(data);
                }
                else if (response.status === 401) {
                    setLoggedIn(false);
                }
                else if (response.status === 403){ // access token expired
                    const refresh_res = await fetch('http://localhost:8888/refresh_token'
                                                        + '?refresh_token='
                                                        + refreshToken);
                    if (refresh_res.status === 200) { // response from auth server successful
                        const newTokenData = await refresh_res.json();
                        setAccessToken(newTokenData.access_token); // set newly refresh access token
                        fetchSpotifyMe();
                    }
                    else {
                        console.log('failed to refresh access token');
                    }
                }
                else {
                    console.log("request failed");
                }
            } catch(e) {
                console.log(e);
            }
        }

        fetchSpotifyMe();
    }, []);

    return (
        <div className='App'>
            <div className='heading'>
                Your Spotify Account
            </div>
            <div className="separator">
            </div>
            <div className='profileContainer'>
                {loggedIn ?
                    <div>
                        <Profile apiData={profile}/>
                    </div>
                    :
                    <div className='loginContainer'>
                        <h2>Login to continue!</h2>
                        <a href='http://localhost:8888/login'>Login</a>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
