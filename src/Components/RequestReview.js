import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function RequestReview ({ movieAndDateAndUserInfo }) {
    return (
        <div className="page-container">
            <div className="title-box green-title-color ">
                <h1>
                    Pedido feito com sucesso!
                </h1>
            </div>
            <ReviewPage>
                <ChoiceReviewContainer>
                    <RequestInfoBox>
                        <h2>
                            Filme e sessão
                        </h2>
                        <span>
                            {movieAndDateAndUserInfo.movieAndSession.title}
                        </span>
                        <span>
                            {`${movieAndDateAndUserInfo.movieAndSession.date} ${movieAndDateAndUserInfo.movieAndSession.time}`}
                        </span>
                    </RequestInfoBox>
                    <RequestInfoBox>
                        <h2>
                            Ingressos
                        </h2>
                        {movieAndDateAndUserInfo.tickets[0].map((ticket, i) => 
                            <span key={i}>
                                Assento {ticket.name}
                            </span>
                        )}
                    </RequestInfoBox>
                    <RequestInfoBox>
                        <h2>
                            Comprador
                        </h2>
                        <span>
                            Nome: {movieAndDateAndUserInfo.buyer.buyerName}
                        </span>
                        <span>
                            CPF: {movieAndDateAndUserInfo.buyer.buyerCPF}
                        </span>
                    </RequestInfoBox>
                </ChoiceReviewContainer>
                <Link className="home-button" to="/">
                    Voltar para Home
                </Link>
            </ReviewPage>
        </div>
    )
}

const ReviewPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .green-title-color {
        color: #247A6B;
        font-weight: bold;
    }
    .home-button {
        width: 225px;
        height: 42px;
        background-color: #E8833A;
        border-radius: 3px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 50px;
        text-decoration: none;
        margin-bottom: 70px;
    }
`
const ChoiceReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 23px;
    gap: 35px;
`
const RequestInfoBox = styled.div`
    color: #293845;
    display: flex;
    flex-direction: column;
    width: 332px;

    h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 11px;
    }
    span {
        font-size: 22px;
        line-height: 27px;
    }
`