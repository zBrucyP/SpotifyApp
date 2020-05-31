import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import TopArtistTrack from './TopArtistTrack';
import './App.css';
import spotify_logo_white from './img/Spotify_Icon_RGB_White.png';


function App() {

    /* grabs query strings from url */
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

    const [accessToken, setAccessToken] = useState(() => getParam('access_token')); // shows approved access to API
    const [refreshToken, setRefreshToken] = useState(() => getParam('refresh_token')); // used to refresh access token when expired
    const [loggedIn, setLoggedIn] = useState(accessToken ? true : false);
    const [profile, setProfile] = useState(null); // stores basic user profile info as json
    const [topTracks, setTopTracks] = useState(null); // stores user's top track info as json
    const [topTracksTimeFrame, setTracksTimeFrame] = useState('long_term');
    const [topArtists, setTopArtists] = useState(null);
    const [topArtistsTimeFrame, setArtistsTimeFrame] = useState('long_term');

    async function refreshAccess() {
        const refresh_res = await fetch('http://localhost:8888/refresh_token'
                                            + '?refresh_token='
                                            + refreshToken);
        if (refresh_res.status === 200) { // response from auth server successful
            const newTokenData = await refresh_res.json();
            setAccessToken(newTokenData.access_token); // set newly refreshed access token
        }
        else {
            console.log('failed to refresh access token');
        }
    }

    /* TODO: Restructure to allow components to query their own data. HOC querying is going to get cluttered */
    /* Profile Data*/
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
                    refreshAccess();
                    fetchSpotifyMe();
                }
                else {
                    console.log("profile request failed");
                }
            }
            catch(e) {
                console.log(e);
            }
        }
        fetchSpotifyMe(); // call the above function. This avoids minor React error in console
    }, []);

    /* Top Tracks/Artists Data */
    useEffect ( () => {
        async function fetchTopTracksArtists(type) {
            try {
                var time_range = null; // define time range for query
                if (type == 'tracks') {time_range = topTracksTimeFrame}
                    else {time_range = topArtistsTimeFrame}

                const response = await fetch('https://api.spotify.com/v1/me/top/' + type + '/', { // fetch data
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    },
                    time_range: time_range
                });
                if (response.status === 200) { // set data
                    const data = await response.json();
                    if (type == 'tracks') {setTopTracks(data)}
                        else {setTopArtists(data)}
                    console.log(data);
                }
                else if (response.status === 401) {
                    setLoggedIn(false);
                }
                else if (response.status === 403) {
                    refreshAccess();
                    fetchTopTracksArtists(type);
                }
                else {
                    console.log('top data request failed');
                }
            }
            catch(e) {
                console.log(e);
            }
        }

        fetchTopTracksArtists('tracks');
        fetchTopTracksArtists('artists');
    }, [topTracksTimeFrame, topArtistsTimeFrame]);

    /*  */

    return (
        <div className='App'>
            <div className='appHeadingContainer'>
                <div className='heading'>Your Info...</div>
                <div className="fromSpotify">from Spotify</div>
            </div>
            <div className='separator'></div>
            <div className='allUserInfoContainer'>
                {loggedIn ?
                    <div>
                        <div className='componentContainer'>
                            <Profile apiProfileData={profile} />
                        </div>
                        <div className='componentContainer'>
                            <h2 className='headerContainer'>Top Tracks & Artists</h2>
                            <div className='topArtistTrackContainer'>
                                <TopArtistTrack type='tracks' apiTracksArtistData={topTracks} />
                                <TopArtistTrack type='artists' apiTracksArtistData={topArtists} />
                            </div>
                        </div>
                    </div>
                :
                    <div className='loginContainer'>
                        <h2 className='headerContainer'>Login with Spotify to continue!</h2>
                        <a className='loginLink' href='http://localhost:8888/login'>Login <img src={spotify_logo_white} alt='spotify_logo' width='25px'></img></a>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
