import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.find(fav => fav.name === item.name);

    const imgType = type === "people" ? "characters" : type;
    const imgUrl = `https://starwars-visualguide.com/assets/img/${imgType}/${item.uid}.jpg`;

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "remove_favorite", payload: item });
        } else {
            dispatch({ type: "add_favorite", payload: { ...item, type } });
        }
    };

    return (
        <div className="card mx-2" style={{ minWidth: "18rem", flex: "0 0 auto" }}>
            <img
                src={imgUrl}
                className="card-img-top"
                alt={item.name}
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://dummyimage.com/400x400/ededed/000000&text=No+Image";
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between mt-3">
                    <Link to={`/details/${type}/${item.uid}`} className="btn btn-outline-primary">
                        Learn more!
                    </Link>
                    <button className="btn btn-outline-warning" onClick={handleFavorite}>
                        <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};