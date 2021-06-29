import React,{ useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import { PlacesList } from '../components/PlacesList';

const KEY = 'address.localStore';


export function Places({newPlace}) {

    // States Section
    const [ places, setPlaces ] = useState([]);
    const [ locationPlace, setLocationPlace ] = useState();
    
    const history = useHistory();

    let localAddress = newPlace;

    // Getting Address from localStore
    useEffect( () => {

        const storePlaces = JSON.parse(localStorage.getItem(KEY));
        if( storePlaces && !newPlace){
            newPlace = storePlaces;
            handleNewPlace();
        }

    }, [] );

    //Save Address in localStore
    useEffect(()=>{

        handleNewPlace();
        localStorage.setItem( KEY, JSON.stringify(newPlace) )
    }, [newPlace]);

    const handleNewPlace = async () => {

        if( newPlace.length === 0 ){
            history.push('/');
            return;
        }

        // Inputs value from useRef()
        let nstreet = String(newPlace.newStreet);
        let nprovice = String(newPlace.province);
        let placeSearching = String(newPlace.typePlace);

        if( nstreet === "" ) return;

        nstreet = nstreet.replace(/\s+/g, '+').toLocaleLowerCase();
        nprovice = nprovice.replace(/\s+/g, '+').toLocaleLowerCase();

        // Getting ll ( latitud & longitufd )data

        let llintermedia;
        let ll;
        await axios.get('https://nominatim.openstreetmap.org/search?q='+ nstreet +'%2C+' + nprovice + '&format=geojson').then( response => {

            llintermedia = response.data;

            ll = (llintermedia &&  llintermedia.features.length > 0) 
                ? llintermedia.features[0].geometry.coordinates
                : [ 40.4165, -3.70256 ];

            setLocationPlace(ll);
        } );

        // Getting places

        nstreet = nstreet.replace(/\s+/g, '-').toLocaleLowerCase();
        placeSearching = placeSearching.replace(/\s+/g, '-').toLocaleLowerCase();

        const url = "https://api.foursquare.com/v2/venues/search?client_id=" + process.env.REACT_APP_CLIENT_ID +"&client_secret=" + process.env.REACT_APP_CLIENT_SECRET + "&v=20210425&ll="+ ll[1] + "," + ll[0] + "&intent=browse&radius=10000&query=" + placeSearching + "&limit=20";

        await axios.get(url).then( response => {

            let Getplaces = response.data.response.venues;

            setPlaces(Getplaces);

        }).catch( error => console.log(error) );

    }

    const dataPlaceSelected = (placeDetails) => {

        history.push("/places/details", [placeDetails]);
    }

    const handleResetDataLocalStore = () => {

        localStorage.setItem( KEY, JSON.stringify([]) );
        
        history.push("/");
    }

    return (

        <Fragment>
            <header className="header2">
                <h2 className="title">Nearby Places</h2>
            </header>
            <main className="main"> 
                <div className="contentAddress">
                    <p className="addressAside"><i className="fas fa-map-marker-alt"></i> {localAddress.newStreet}, {localAddress.province}</p>
                    <button type="button" className="editAddress" onClick={handleResetDataLocalStore}>Change Address <i className="fas fa-pencil-alt"></i></button>
                </div>
                <div className="showPlaces">
                    <PlacesList className="List" placesArray={places} dataPlaceSelected={dataPlaceSelected} locationPlace={locationPlace}/>
                </div>
            </main>
            <footer className="footer">
                <h2 className="title">Nearby Places</h2>
                <p className="copyright">All rights reserved &copy; 2021</p>
            </footer>
        </Fragment>
    )
}
