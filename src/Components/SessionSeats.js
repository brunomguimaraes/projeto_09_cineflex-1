import { getSessionSeats } from "../API";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import BottomBar from "./BottomBar";

export default function SessionSeats () {

    const { sessionId } = useParams();
    const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {

        getSessionSeats(sessionId)
        .then(response => {
            setSelectedSession(response.data);
            console.log(response.data);
        }).catch(error => {
            alert("Deu ruim aqui também novamente");
        })

    }, [])

    if (selectedSession === null) {
        return (
            <Loading />
        )
    }

    const selectSeat = (id) => {
        const newSession = {...selectedSession};

        if (newSession.seats[id - 1].clicked === true) {
            delete newSession.seats[id - 1].clicked;
            setSelectedSession(newSession);
            return;
        }

        newSession.seats[id - 1].clicked = true;
        setSelectedSession(newSession);
    }

    
    return (
        <div className="page-container">
            <div className="title-box">
                <h1>
                    Selecione o(s) assento(s)
                </h1>
            </div>
            <div className="seats-page-container">
                <ul className="seats">
                    {selectedSession.seats.map(({id, name: number, isAvailable, clicked}, i) => 
                        <li onClick={() => selectSeat(id)} className={`seat ${clicked === undefined ? (isAvailable === false ? ("gray") : ("yellow")) : ("green")}`} key={i}>
                            {number >= 1 && number <= 9 ? (
                                "0" + number
                            ) : (
                                number
                            )}
                        </li>
                    )}
                </ul>
                <div className="legend-box">
                    <div className="description">
                        <div className="circle green">
                        </div>
                        <span>
                            Selecionado
                        </span>
                    </div>
                    <div className="description">
                        <div className="circle gray">
                        </div>
                        <span>
                            Disponível
                        </span>
                    </div>
                    <div className="description">
                        <div className="circle yellow">
                        </div>
                        <span>
                            Indisponível
                        </span>
                    </div>
                </div>
                <div className="inputs-container">
                    <div className="input-box">
                        <span className="input-explanation">
                            Nome do comprador:
                        </span>
                        <input placeholder="Digite seu nome..."></input>
                    </div>
                    <div className="input-box">
                        <span className="input-explanation">
                            CPF do comprador:
                        </span>
                        <input placeholder="Digite seu CPF..."></input>
                    </div>
                </div>
                <a className="finish-button" href="sdfas">
                    Reservar assento    
                </a>
            </div>
            <BottomBar movieName={selectedSession.movie.title} movieURL={selectedSession.movie.posterURL} date={selectedSession.day.weekday} time={selectedSession.name}/>
        </div>
    )
}