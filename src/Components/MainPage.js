import { useState, useEffect } from "react";
import { getMovies } from "../API";
import Loading from "./Loading";

export default function MainPage () {

    const [movies, setMovies] = useState(null);

    useEffect( () => {
        getMovies()
        .then(response => {
            setMovies(response.data);
            console.log(response);
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
                    {movies.map(({posterURL : url}, i) => 
                        <li className="movie" key={i}>
                            <img src={url} alt=""/>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}