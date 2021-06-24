import React, { useState, useRef} from 'react'
import { Places } from './pages/Places';
import { PageDetails } from './pages/PageDetails';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './style.scss';

export function App() {
    
    const newStreet = useRef();
    const province = useRef();
    const typePlace = useRef();
    
    const [newPlace, setNewPlace] = useState([]);
    const [link, setLink] = useState(false);

    const handlePlaceData = () => {

        let street = newStreet.current.value;        
        let location = province.current.value;        
        let query = typePlace.current.value;

        setNewPlace( { newStreet: street,  province: location, typePlace: query} );
        setLink(false);
    }

    const handleLinkState = () => {

        if(newStreet.current.value !== "" || province.current.value !== ""){
            setLink(true);
        } else {
            setLink(false);
        }
    }

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <header className="header"></header>
                    <div className="contentForm">

                        <div className="contentTitles">

                            <h2 className="titleForm">Nearby places</h2>
                            <h4 className="title2Form"><i className="fas fa-map-marked-alt"></i> Take a look at what's near you</h4>

                        </div>

                        <form className="form">
                            <input type="text" ref={newStreet} className="input" placeholder="Street, number" autoFocus  onChange={handleLinkState}/>
                            <input type="text" ref={province} className="input" placeholder="Province" />
                            <input type="text" ref={typePlace} className="input" placeholder="Pizza, park, coffe ..." />
                            {link === true
                            ? <Link onClick={ () => handlePlaceData()} className="btn" to="/places"><i className="fas fa-search"></i></Link>
                            : <button type="button" className="btn btnDisable"><i className="fas fa-search"></i></button> 
                            }
                        </form>
                    </div>
                    <footer className="footer fHome">
                        <h2 className="title">Nearby Places</h2>
                        <p className="copyright">All rights reserved &copy; 2021</p>
                    </footer>
                </Route>
                <Route path="/places" exact>
                    <Places newPlace={newPlace}/>
                </Route>
                <Route path="/places/details">
                    <PageDetails/>
                </Route>
            </Switch>
        </Router>
    )
}
