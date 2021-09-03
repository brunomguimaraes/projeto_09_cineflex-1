import { getSessionSeats, postRequest } from "../API";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import BottomBar from "./BottomBar";
import { IoIosTrash } from "react-icons/io";

export default function SessionSeats ({ getAllUserChoicesDataToSend }) {

    const [nameInput, setNameInput] = useState("");
    const [CPFInput, setCPFInput] = useState("");

    const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);

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
            console.log(selectedSession);

            const newIdsArray = [...selectedSeatsIds].filter((IdValue) => IdValue !== id);
            setSelectedSeatsIds(newIdsArray);            
            return;
        }

        newSession.seats[i].clicked = true;
        setSelectedSession(newSession);
        setSelectedSeatsIds([...selectedSeatsIds, id]);
    }

    const reserveSeats = () => {

        generateObjectWithUserChoicesAndSendToReviewPage();

        postRequest({
            ids: selectedSeatsIds,
            name: nameInput,
            cpf: CPFInput
        }).then(sucess => console.log(sucess))
        .catch(error => console.log(error.status))
    }

    const generateObjectWithUserChoicesAndSendToReviewPage = () => {
        const userData = {
            movieAndSession: {
                title: selectedSession.movie.title,
                date: selectedSession.day.date,
                time: selectedSession.name
            },
            tickets: [selectedSession.seats.filter(seat => seat.clicked === true)],
            buyer: {
                buyerName: nameInput,
                buyerCPF: CPFInput
            }
        }
        console.log(userData);
        getAllUserChoicesDataToSend(userData);
    }

    const reset = () => {
        setNameInput("");
        setCPFInput("");

        const resetedSessionArray = {...selectedSession};
        resetedSessionArray.seats.forEach(element => {
            if (element.clicked === true) {
                delete element.clicked;
            }
        });
        setSelectedSession(resetedSessionArray);
        setSelectedSeatsIds([]);
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
                        <input placeholder="Digite seu nome..." onChange={e => setNameInput(e.target.value)} value={nameInput}></input>
                    </div>
                    <div className="input-box">
                        <span className="input-explanation">
                            CPF do comprador:
                        </span>
                        <input placeholder="Digite seu CPF..." onChange={e => setCPFInput(e.target.value)} value={CPFInput}></input>
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={reset} className="reset-button"><IoIosTrash /></button>
                    <Link onClick={reserveSeats} to="/sucess" className={`finish-button ${(selectedSeatsIds.length > 0 && nameInput !== "" && CPFInput !== "") ? ("") : ("disabled-link")}`}>
                        Reservar assento    
                    </Link>
                </div>
            </div>
            <BottomBar movieName={selectedSession.movie.title} movieURL={selectedSession.movie.posterURL} date={selectedSession.day.weekday} time={selectedSession.name}/>
        </div>
    )
}
