import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import {
    Link,
    useHistory
} from "react-router-dom";
import image from '../assets/img/default-image.jpg';
import GoogleMaps from 'simple-react-google-maps'

// const KEY = 'venueDetails.localStore';

export  function PageDetails() {

    // const [ select ] = useState();

    const history = useHistory();
    
    const location = useLocation();

    if( location.state === undefined ){
        console.log('Es undefined dice');
        history.push('/');
    }

    const [ venueDetails, setVenueDetails ] = useState({});

    // useEffect Section
    useEffect(()=>{

        handleVenueDetails();
        // localStorage.setItem( KEY, JSON.stringify(venueDetails) );

    }, [])

    //  Getting Venue Details
    const handleVenueDetails = async () => {

        const url = "https://api.foursquare.com/v2/venues/"+ location.state[0].id +"/?&client_id=" + process.env.REACT_APP_CLIENT_ID + "&client_secret=" + process.env.REACT_APP_CLIENT_SECRET + "&v=20210425";
        
        await axios.get(url).then( response => {

            setVenueDetails(response.data.response.venue);

        }).catch( error => console.log(error) );

    }


    let imgPlace;
    let categorie;

    if( location.state[0].categories.length !== 0 ){
        categorie = location.state[0].categories[0].name;
        imgPlace = `${location.state[0].categories[0].icon.prefix}88${location.state[0].categories[0].icon.suffix}`;
    } else if( location.state[0].categories.length === undefined ){
        categorie = "Location not found";
    } else {
        imgPlace = image;
        categorie = "Location not found";
    }

    let prefixPhoto = venueDetails.photos && venueDetails.photos.groups.length > 0 && venueDetails.photos.groups[0].items[0] ? venueDetails.photos.groups[0].items[0].prefix : "";
    let suffixPhoto = venueDetails.photos && venueDetails.photos.groups.length > 0 && venueDetails.photos.groups[0].items[0] ? venueDetails.photos.groups[0].items[0].suffix : "";
    let Photo = ` ${prefixPhoto}250${suffixPhoto} `;

    return (
        <Fragment>
            <header className="header2">
                <h2 className="title tDetails">Neardy Places</h2>
            </header>

            <div className="contentPlaceDetails">
            
                <Link to='/places'><i className="fas fa-arrow-circle-left back"></i></Link>

                <div className="detailsTop">

                    <img className="imgPlaceDetails" src={Photo.length > 200 || Photo === undefined || Photo === " 250 " ? imgPlace : Photo} alt={location.state[0].name} />

                    <div className="textDetailsTop">

                        <h1 className="title">{ venueDetails.name ? venueDetails.name : location.state[0].name }</h1>
                        <h2 className="title2">{categorie}</h2>

                        <div className="DetailsInfo">

                            <p className="likes"><i className="fas fasDetails fa-heart"></i> {venueDetails.likes ? venueDetails.likes.count : " 0 "}</p>

                            <p className="peopleHere"><i className="fas fasDetails fa-users"></i> {venueDetails.hereNow ? venueDetails.hereNow.summary : "0 people there"}</p>

                            <p className="address"><i className="fas fasDetails fa-map-marker-alt"></i> {location.state[0].location.formattedAddress[0]},{location.state[0].location.formattedAddress[1]}</p>

                            <p className="distance"><i className="fas fasDetails fa-street-view"></i> The place is {location.state[0].location.distance} meters from you</p>

                            <p className="price"><i className="fas fasDetails fa-dollar-sign"></i> {venueDetails.price ? venueDetails.price.message : "Data price not found"}</p>

                            <p className="url"><a target="_blank" href={venueDetails.shortUrl ? venueDetails.shortUrl : " Url not found "}>
                                <i className="fas fasDetails fa-link"></i> {venueDetails.shortUrl ? venueDetails.shortUrl : " Url not found "}
                            </a></p>

                        </div>
                    </div>

                </div>
                <div className="contentAllDataPlace">
                    <h3 className="titleMap">Check the location of the place here <i className="fas fa-arrow-down"></i></h3>
                    <div className="map">
                        <GoogleMaps 
                            apiKey={process.env.REACT_APP_API_MAP_KEY}
                            style={{ height : "100%", width : "100%", borderRadius : "1rem" }} 
                            zoom={17} 
                            center={{ lat: location.state[0].location.lat, lng: location.state[0].location.lng }}
                            markers={{ lat: location.state[0].location.lat, lng: location.state[0].location.lng }}
                        />
                    </div>
                </div>
            </div>
            <footer className="footer">
                <h2 className="title">Neardy Places</h2>
                <p className="copyright">All rights reserved &copy; 2021</p>
            </footer>
        </Fragment>
    )
}
