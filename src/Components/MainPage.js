import { useState, useEffect } from "react";
import { getMovies } from "../API";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import "../css/mainpage.css";

export default function MainPage () {

    const [movies, setMovies] = useState(null);

    useEffect( () => {
        getMovies()
        .then(response => {
            setMovies(response.data);
        }).catch(error => {
            alert("Deu ruim aqui");
        })
    }, [])

    if (movies === null) {
        return (
            <Loading />
        )
    }

    return (
        <div className="page-container">
            <div className="title-box">
                <h1>
                    Selecione o filme
                </h1>
            </div>
            <div className="movies-container">
                <ul className="movies-list">
                    {movies.map(({posterURL, id}, i) => 
                        <li className="movie" key={i}>
                            <Link to={`/sessions/${id}`}>
                                <img src={posterURL} alt=""/>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}