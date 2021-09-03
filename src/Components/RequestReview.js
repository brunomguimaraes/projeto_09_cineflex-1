import { Link } from "react-router-dom";

export default function RequestReview ({ movieAndDateAndUserInfo }) {
    return (
        <div className="page-container">
            <div className="title-box green-title-color ">
                <h1>
                    Pedido feito com sucesso!
                </h1>
            </div>
            <div className="review-page">
                <div className="choice-review-container">
                    <div className="request-info-box">
                        <h2>
                            Filme e sessão
                        </h2>
                        <span>
                            {movieAndDateAndUserInfo.movieAndSession.title}
                        </span>
                        <span>
                            {`${movieAndDateAndUserInfo.movieAndSession.date} ${movieAndDateAndUserInfo.movieAndSession.time}`}
                        </span>
                    </div>
                    <div className="request-info-box">
                        <h2>
                            Ingressos
                        </h2>
                        {movieAndDateAndUserInfo.tickets[0].map((ticket, i) => 
                            <span key={i}>
                                Assento {ticket.name}
                            </span>
                        )}
                    </div>
                    <div className="request-info-box">
                        <h2>
                            Comprador
                        </h2>
                        <span>
                            Nome: {movieAndDateAndUserInfo.buyer.buyerName}
                        </span>
                        <span>
                            CPF: {movieAndDateAndUserInfo.buyer.buyerCPF}
                        </span>
                    </div>
                </div>
                <Link className="home-button" to="/">
                    Voltar para Home
                </Link>
            </div>
        </div>
    )
}