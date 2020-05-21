import React, { useState } from 'react';
import {useParams} from 'react-router';
import './App.css';


// use fetch to query the server for the authentication
// don't let react leave this page, there is no point, they should be independent

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

    return (
        <div className='App'>
            {loggedIn ? '' : <a href='http://localhost:8888/login'>Login</a>}
            <p>{accessToken}</p>
        </div>
    );
}

export default App;
