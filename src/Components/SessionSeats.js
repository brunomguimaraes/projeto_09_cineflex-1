import { getSessionSeats, postRequest } from "../API";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import BottomBar from "./BottomBar";

export default function SessionSeats () {

    const [nameInput, setNameInput] = useState("");
    const [CPFInput, setCPFInput] = useState("");

    const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);

    console.log(selectedSeatsIds);

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

    const selectSeat = (i, isAvailable, id) => {

        if (isAvailable === false) {
            alert("Este assento não está disponível!");
            return;
        }

        const newSession = {...selectedSession};

        if (newSession.seats[i].clicked === true) {
            delete newSession.seats[i].clicked;
            setSelectedSession(newSession);

            const newIdsArray = [...selectedSeatsIds].filter((IdValue) => IdValue !== id);
            setSelectedSeatsIds(newIdsArray);            
            return;
        }

        newSession.seats[i].clicked = true;
        setSelectedSession(newSession);
        setSelectedSeatsIds([...selectedSeatsIds, id]);
    }

    const reserveSeats = () => {
        postRequest({
            ids: selectedSeatsIds,
            name: nameInput,
            cpf: CPFInput
        }).then(response => console.log(response.status))
        .catch(error => console.log(error.status))
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
                        <li onClick={() => selectSeat(i, isAvailable, id)} className={`seat ${clicked === undefined ? (isAvailable === true ? ("gray") : ("yellow")) : ("green")}`} key={i}>
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
                        <input placeholder="Digite seu nome..." onChange={event => setNameInput(event.target.value)}></input>
                    </div>
                    <div className="input-box">
                        <span className="input-explanation">
                            CPF do comprador:
                        </span>
                        <input placeholder="Digite seu CPF..." onChange={event => setCPFInput(event.target.value)}></input>
                    </div>
                </div>
                <Link onClick={reserveSeats} to="/sucess" className="finish-button">
                    Reservar assento    
                </Link>
            </div>
            <BottomBar movieName={selectedSession.movie.title} movieURL={selectedSession.movie.posterURL} date={selectedSession.day.weekday} time={selectedSession.name}/>
        </div>
    )
}
