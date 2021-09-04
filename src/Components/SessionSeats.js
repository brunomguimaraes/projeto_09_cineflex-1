import { getSessionSeats, postRequest } from "../API";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import BottomBar from "./BottomBar";
import { IoIosTrash } from "react-icons/io";
import GoBackButton from "./GoBackButton";
import styled from 'styled-components';

export default function SessionSeats ({ getAllUserChoicesDataToSend }) {

    const [nameInput, setNameInput] = useState("");
    const [CPFInput, setCPFInput] = useState("");
    const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const { sessionId } = useParams();
    let isCPFValid;

    useEffect(() => {
        getSessionSeats(sessionId)
        .then(response => {
            setSelectedSession(response.data);
        }).catch(error => {
            alert("Não foi possível fazer contato com o servidor!");
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
        getAllUserChoicesDataToSend(userData);
    }

    const validateCPF = (event) => {
        if (CPFInput.length !== 11 || !Number(CPFInput)) {
            isCPFValid = false;
            alert("CPF inválido!");
            event.preventDefault();
            event.stopPropagation();
        } else {
            isCPFValid = true;
        }
        return isCPFValid;
    }

    const reserveSeats = (event) => {
        validateCPF(event);
        if (!isCPFValid) {
            return;
        }

        generateObjectWithUserChoicesAndSendToReviewPage();
        postRequest({
            ids: selectedSeatsIds,
            name: nameInput,
            cpf: CPFInput
        }).then(sucess => console.log(sucess.status))
        .catch(error => {
            alert("Não foi possível fazer contato com o servidor e seu pedido não foi concluído! Por favor, tente novamente.")
        })
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
            <GoBackButton />
            <div className="title-box">
                <h1>
                    Selecione o(s) assento(s)
                </h1>
            </div>
            <SeatsPageContainer>
                <Seats>
                    {selectedSession.seats.map(({id, name: number, isAvailable, clicked}, i) => 
                        <Seat onClick={() => selectSeat(i, isAvailable, id)} className={`${clicked === undefined ? (isAvailable === true ? ("gray") : ("yellow")) : ("green")}`} key={i}>
                            {number >= 1 && number <= 9 ? (
                                "0" + number
                            ) : (
                                number
                            )}
                        </Seat>
                    )}
                </Seats>
                <LegendBox>
                    <Description>
                        <LegendCircle className="green">
                        </LegendCircle>
                        <span>
                            Selecionado
                        </span>
                    </Description>
                    <Description>
                        <LegendCircle className="gray">
                        </LegendCircle>
                        <span>
                            Disponível
                        </span>
                    </Description>
                    <Description>
                        <LegendCircle className="yellow">
                        </LegendCircle>
                        <span>
                            Indisponível
                        </span>
                    </Description>
                </LegendBox>
                <InputsContainer>
                    <InputBox>
                        <InputExplanation>
                            Nome do comprador:
                        </InputExplanation>
                        <input placeholder="Digite seu nome..." onChange={event => setNameInput(event.target.value)} value={nameInput}></input>
                    </InputBox>
                    <InputBox>
                        <InputExplanation>
                            CPF do comprador:
                        </InputExplanation>
                        <input placeholder="Digite seu CPF..." onChange={event => setCPFInput(event.target.value)} value={CPFInput}></input>
                    </InputBox>
                </InputsContainer>
                <Buttons>
                    <ResetButton onClick={reset}><IoIosTrash /></ResetButton>
                    <Link onClick={event => reserveSeats(event)} to="/sucess" className={`finish-button ${(selectedSeatsIds.length > 0 && nameInput !== "" && CPFInput !== "") ? ("") : ("disabled-link")}`}>
                        Reservar assento    
                    </Link>
                </Buttons>
            </SeatsPageContainer>
            <BottomBar movieName={selectedSession.movie.title} movieURL={selectedSession.movie.posterURL} date={selectedSession.day.weekday} time={selectedSession.name}/>
        </div>
    )
}

const SeatsPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 150px;

    .green {
        background-color: #8DD7CF;
    }
    .gray {
        background-color: #C3CFD9;
    }
    .yellow {
        background-color: #FBE192;
    }
`
const Seats = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 332px;
`
const Seat = styled.li`
    border-radius: 33px;
    border: 1px solid #808F9D;
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    cursor: pointer;
`
const LegendBox = styled.div`
    margin-top: 25px;
    display: flex;
    justify-content: space-evenly;
    width: 332px;
`
const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #4E5A65;
    font-size: 13px;
`
const LegendCircle = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 33px;
    margin-bottom: 7px;
    border: 1px solid #808F9D;
`
const InputsContainer = styled.div`
    width: 332px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 10px;
`
const InputBox = styled.div`
    display: flex;
    flex-direction: column;

    input {
        height: 51px;
        outline: none;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        padding-left: 18px;
        font-size: 18px;
    }
    input::placeholder {
        color: #AFAFAF;
        font-size: 18px;
        font-style: italic;
    }
`
const InputExplanation = styled.span`
    font-size: 18px;
    line-height: 25px;
`
const Buttons = styled.div`
    display: flex;
    margin-top: 30px;

    .finish-button {
        width: 225px;
        height: 42px;
        background-color: #E8833A;
        border-radius: 3px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }
    .disabled-link {
        pointer-events: none;
    }
`
const ResetButton = styled.button`
    height: 42px;
    width: 42px;
    margin-right: 20px;
    background-color: crimson;
    border: none;
    border-radius: 3px;
    color: #ffffff;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`