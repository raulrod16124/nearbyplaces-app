import React, {Fragment} from 'react';
import image from '../assets/img/default-image.jpg';

export function PlaceData( { place, dataPlaceSelected } ) {

    // console.log(place);
    
    let imgPlace;
    let categorie;
    
    if(place.categories.length !== 0){
        categorie = place.categories[0].name;
        imgPlace = `${place.categories[0].icon.prefix}88${place.categories[0].icon.suffix}`;
    } else if( place.categories.length === undefined ){
        categorie = "Location not found";
    } else {
        imgPlace = image;
        categorie = "Location not found";
    }

    const handleAddRoute = (place) => {
        dataPlaceSelected(place);
    }

    return (
        <Fragment>
            <div className="place" onClick={()=>handleAddRoute(place)}>
                <img className="imgPlace" src={imgPlace} alt={place.name} />
                <div className="contentData">
                    <h3 className="titlePlace">{place.name}</h3>
                    <h5 className="categoriePlace">{categorie}</h5>
                    <p className="addressPlace">Address: {place.location.formattedAddress[0]}, {place.location.formattedAddress[1]}</p>
                    <p className="distancePlace">Distance: {place.location.distance} meters</p>
                </div>
            </div>
        </Fragment>
    )
}
