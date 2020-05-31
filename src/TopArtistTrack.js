import React, { useState, useEffect } from 'react';
import './App.css';

/*
Artists:
-id
-name
-href

Tracks:
-id
-name
-artists
-href
-
*/


export default function TopArtistTrack(props) {

    const [data, setData] = useState(props.apiTracksArtistData);

    useEffect( () => {
        setData(props.apiTracksArtistData);
    }, [props.apiTracksArtistData]);


    return(
        <div className='topArtistTrackComponent'>
            { data ?
                <div>

                </div>
            :
                <div></div>
            }
        </div>
    );
}

function ScrollListElement (listItem) {
    return (
        <div className='scrollListElement' key={listItem.id}>
            <a href={listItem.link}>{listItem.title}</a>
            <div>{listItem.subInfo}</div>
        </div>
    );
}
