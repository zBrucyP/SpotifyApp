import React, { useState } from 'react';

export default function Profile (props) {

    const [filled, setFilled] = useState(false);
    const [profile, setProfile] = useState(null);

    return (
        <div>
            {props.apiData ? 'Spotify Profile Data Received!' : 'Loading profile...'}
        </div>
    );
}
