import React, { useState, useEffect } from 'react';
import './App.css';

export default function Profile (props) {

    const [profile, setProfile] = useState(props.apiData);

    useEffect(() => {
        setProfile(props.apiData);
    }, [props.apiData]);

    return (
        <div>
            {profile ?
                <div>
                    <h2 className='headerContainer'>Profile</h2>
                    <div className='profileGrid'>
                        <div>
                            { profile.images ?
                            <img src={profile.images[0].url}></img>
                            :
                            <img src=''></img>
                            }
                        </div>
                        <div className='labelDataWrapper'>
                            <div className='profileLabel'>Display Name:</div> <div className='profileDataPoint'>{profile.display_name}</div>
                        </div>
                        <div className='labelDataWrapper'>
                            <div className='profileLabel'>Email:</div> <div className='profileDataPoint'>{profile.email}</div>
                        </div>
                        <div className='labelDataWrapper'>
                            <div className='profileLabel'>Followers:</div> <div className='profileDataPoint'>{profile.followers.total}</div>
                        </div>
                        <div className='labelDataWrapper'>
                            <div className='profileLabel'>Type:</div> <div className='profileDataPoint'>{profile.product}</div>
                        </div>
                        <div className='labelDataWrapper'>
                            <div className='profileLabel'>Explicit Filtered?</div> <div className='profileDataPoint'>{profile.explicit_content.filter_enabled.toString()}</div>
                        </div>
                        <div className='labelDataWrapper'>
                            <div className='profileLabel'>Country:</div> <div className='profileDataPoint'>{profile.country}</div>
                        </div>
                        <div className='labelDataWrapper'>
                            <div className='profileLabel'>URL:</div> <div className='profileDataPoint'>{profile.external_urls.spotify}</div>
                        </div>
                    </div>
                </div>
                :
                <div></div>}
        </div>
    );
}
