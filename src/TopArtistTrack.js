import React, { useState, useEffect } from 'react';
import './App.css';

/*
Artists:
-id
-name
-href
-img

Tracks:
-id
-name
-artists
-href
-img
*/


export default function TopArtistTrack(props) {

    const [data, setData] = useState(props.apiTracksArtistData);
    const [type, setType] = useState(props.type);
    const [listItems, setListItems] = useState(null);


    /* refresh list if query is refreshed*/
    useEffect( () => {
        if (data != null && type === 'artists') {
            setListItems(data.items.map((item, i) =>
                <ScrollListElement key={item.id} rank={i} link={item.external_urls.spotify} title={item.name} imgUrl={item.images[0].url} subInfo=''/>
            ));
        }
        if (data != null && type === 'tracks') {
            setListItems(data.items.map((item, i) =>
                <ScrollListElement key={item.id} rank={i} link={item.external_urls.spotify} title={item.name} imgUrl={item.album.images[0].url} subInfo={item.artists[0].name}/>
            ));
        }
    }, [data]);


    /* refresh stored data if requeried */
    useEffect( () => {
        setData(props.apiTracksArtistData);
    }, [props.apiTracksArtistData]);


    return(
        <div className='topArtistTrackComponent'>
            { data ?
                <div>
                    {listItems}
                </div>
            :
                <div></div>
            }
        </div>
    );
}

function ScrollListElement (listItem) {
    return (
        <div className='scrollListElement' key={listItem.key}>
            <div>
                {listItem.imgUrl ?
                    <img src={listItem.imgUrl} width='50px' height='50px'></img>
                :
                    <img src=''></img>
                }
            </div>
            <div>
                <a href={listItem.link}>{listItem.rank + 1}. {listItem.title}</a>
                <div>{listItem.subInfo}</div>
            </div>
        </div>
    );
}
