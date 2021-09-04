import { useState, useEffect } from "react";
import { getMovies } from "../API";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function MainPage () {

    const [movies, setMovies] = useState(null);

    useEffect( () => {
        getMovies()
        .then(response => {
            setMovies(response.data);
        }).catch(error => {
            alert("Não foi possível fazer contato com o servidor!");
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
            <MoviesContainer>
                <MoviesList>
                    {movies.map(({posterURL, id}, i) => 
                        <Movie key={i}>
                            <Link to={`/sessions/${id}`}>
                                <img src={posterURL} alt=""/>
                            </Link>
                        </Movie>
                    )}
                </MoviesList>
            </MoviesContainer>
        </div>
    )
}

const MoviesContainer = styled.div`
    display: flex;
    justify-content: center;
`
const MoviesList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 25px;
    width: 315px;
`
const Movie = styled.li`
    height: 209px;
    width: 145px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 8px;

    img {
        height: 100%;
    }
`