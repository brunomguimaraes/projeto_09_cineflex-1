import { getMoviesById } from "../API";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import BottomBar from "./BottomBar";
import GoBackButton from "./GoBackButton";
import "../css/sessions.css";

export default function MovieSessions () {

    const { movieId } = useParams();
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {

        getMoviesById(movieId)
        .then(response => {
            setSelectedMovie(response.data);
        }).catch(error => {
            alert("Deu ruim aqui também");
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
            <div className="sessions-container">
                <ul className="sessions-list">
                    {selectedMovie.days.map(({weekday, date, showtimes}, i) => 
                        <li className="session" key={i}>
                            <span className="session-date">
                                {`${weekday} - ${date}`}
                            </span>
                            <ul className="session-time-options">
                                {showtimes.map(({name: time, id}, j) =>
                                    <li className="time-option" key={j}>
                                        <Link to={`/seats/${id}`} className="time-link">
                                            {time}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
            <BottomBar movieName={selectedMovie.title} movieURL={selectedMovie.posterURL}/>
        </div>
    )
}