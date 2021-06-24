import React, { Fragment } from 'react'
import { PlaceData } from './PlaceData'
import GoogleMaps from 'simple-react-google-maps'

export function PlacesList( {placesArray, dataPlaceSelected, locationPlace, pruebaCoordenadas} ) {

    // console.log(placesArray);

    let latMap;
    let lngMap;

    if( placesArray === undefined ) return ( <h3>Nothing here...</h3> );

    const handleToggleMap = () => {

        document.querySelector('.placesView').classList.toggle('hide');
        document.querySelector('.contentMapPlaces').classList.toggle('hide');

    }

    latMap = locationPlace ? locationPlace[1] : 40.4165;
    lngMap = locationPlace ? locationPlace[0] : -3.70256;

    return (
        <Fragment>
            <button className="btnOpenMaps" type="button" onClick={handleToggleMap}><i className="fas fa-map-marker-alt"></i> Map view</button>
            <div className="placesView">
                { placesArray.map( place => (
                    <PlaceData key={place.id}  place={place} dataPlaceSelected={dataPlaceSelected}/>
                ) )}
            </div>
            <div className="contentMapPlaces hide">
                { locationPlace 
                ?
                    <GoogleMaps 
                        apiKey={process.env.REACT_APP_API_MAP_KEY}
                        style={{ height : "100%", width : "100%", borderRadius : "1rem" }} 
                        zoom={17} 
                        center={{ lat: latMap , lng: lngMap }}
                        markers={{ lat: latMap , lng: lngMap }}
                        // onClick={open}
                    />

                : "Lost coordinates"
                }
            </div>
        </Fragment>
    )
}
