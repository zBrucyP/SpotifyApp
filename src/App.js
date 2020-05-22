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

// https://api.spotify.com/v1/me

    useEffect ( () => {
        async function fetchSpotifyMe() {
            try {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
                const data = await response.json();
                console.log(data);
                setProfile(data);
            } catch(e) {
                console.log(e);
            }
        }

        fetchSpotifyMe();
    }, []);

    return (
        <div className='App'>
            {loggedIn ? '' : <a href='http://localhost:8888/login'>Login</a>}
            <p>{profile ? profile.country : ''}</p>
            <Profile apiData={profile}/>
        </div>
    );
}

export default App;
