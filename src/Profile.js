import React, { useState, useEffect } from 'react';

export default function Profile (props) {

    const [profile, setProfile] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(loggedIn);
    }, [loggedIn]);

    useEffect(() => {
        setProfile(profile);
    }, [profile]);

    return (
        <div>
            {props.loggedIn && props.apiData ? 'Loading profile...' : <div></div>}
        </div>
    );
}
