import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card"; 

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
       
        fetch("https://www.swapi.tech/api/people/")
            .then(res => res.json())
            .then(data => dispatch({ type: "set_characters", payload: data.results }))
            .catch(err => console.error(err));

      
        fetch("https://www.swapi.tech/api/planets/")
            .then(res => res.json())
            .then(data => dispatch({ type: "set_planets", payload: data.results }))
            .catch(err => console.error(err));

        
        fetch("https://www.swapi.tech/api/vehicles/")
            .then(res => res.json())
            .then(data => dispatch({ type: "set_vehicles", payload: data.results }))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-danger">Characters</h2>
            <div className="d-flex flex-row overflow-auto mb-5">
                {store.characters.map((character, index) => (
                    <Card key={index} item={character} type="people" />
                ))}
            </div>

            <h2 className="text-danger">Planets</h2>
            <div className="d-flex flex-row overflow-auto mb-5">
                {store.planets.map((planet, index) => (
                    <Card key={index} item={planet} type="planets" />
                ))}
            </div>

            <h2 className="text-danger">Vehicles</h2>
            <div className="d-flex flex-row overflow-auto mb-5">
                {store.vehicles.map((vehicle, index) => (
                    <Card key={index} item={vehicle} type="vehicles" />
                ))}
            </div>
        </div>
    );
};