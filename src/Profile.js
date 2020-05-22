import React, { useState, useEffect } from 'react';

export default function Profile (props) {

    const [profile, setProfile] = useState(props.apiData);

    useEffect(() => {
        setProfile(props.apiData);
    }, [props.apiData]);

    return (
        <div>
            {profile ?
                <div>
                    <p>Country:</p> {profile.country}
                    <p>Display Name:</p> {profile.display_name}
                </div>
                :
                <div></div>}
        </div>
    );
}
