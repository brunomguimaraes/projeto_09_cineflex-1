export default function RequestReview () {
    return (
        <div className="page-container">
            <div className="title-box green-title-color ">
                <h1>
                    Pedido feito com sucesso!
                </h1>
            </div>
            <div className="choice-review-container">
                <div className="request-info-box">
                    <h2>
                        Filme e sessão
                    </h2>
                    <span>
                        Enola Holmes
                    </span>
                    <span>
                        24/06/2021 15:00
                    </span>
                </div>
                <div className="request-info-box">
                    <h2>
                        Ingressos
                    </h2>
                    <span>
                        Assento 15
                    </span>
                    <span>
                        Assento 16
                    </span>
                </div>
                <div className="request-info-box">
                    <h2>
                        Comprador
                    </h2>
                    <span>
                        Nome: Maricreudo da Silvete Jambarguês
                    </span>
                    <span>
                        CPF: 123.456.789-10
                    </span>
                </div>
            </div>
        </div>
    )
}