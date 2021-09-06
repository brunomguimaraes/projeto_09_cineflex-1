import { getMoviesById } from "../API";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import BottomBar from "./BottomBar";
import GoBackButton from "./GoBackButton";
import styled from 'styled-components';

export default function MovieSessions () {

    const { movieId } = useParams();
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {

        getMoviesById(movieId)
        .then(response => {
            setSelectedMovie(response.data);
        }).catch(error => {
            alert("Não foi possível fazer contato com o servidor!");
        })

    }, [])

    if (selectedMovie === null) {
        return (
            <Loading />
        )
    }

    return (
        <div className="page-container">
            <GoBackButton />
            <div className="title-box">
                <h1>
                    Selecione o horário
                </h1>
            </div>
            <SessionsContainer>
                <SessionsList>
                    {selectedMovie.days.map(({weekday, date, showtimes}, i) => 
                        <li className="session" key={i}>
                            <SessionDate>
                                {`${weekday} - ${date}`}
                            </SessionDate>
                            <SessionTimeOptions>
                                {showtimes.map(({name: time, id}, j) =>
                                    <TimeOption key={j}>
                                        <Link to={`/seats/${id}`} className="time-link">
                                            {time}
                                        </Link>
                                    </TimeOption>
                                )}
                            </SessionTimeOptions>
                        </li>
                    )}
                </SessionsList>
            </SessionsContainer>
            <BottomBar movieName={selectedMovie.title} movieURL={selectedMovie.posterURL}/>
        </div>
    )
}

const SessionsContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 0 23px;
    margin-bottom: 150px;
`
const SessionsList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 23px;
    width: 100%;
    min-width: 329px;
`
const SessionDate = styled.span`
    font-size: 20px;
    line-height: 24px;
`
const SessionTimeOptions = styled.ul`
    margin-top: 22px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`
const TimeOption = styled.li`
    width: 83px;
    height: 43px;
    font-size: 18px;
    background-color: #E8833A;
    border-radius: 3px;
    color: #ffffff;

    .time-link {
        text-decoration: none;
        color: black;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`