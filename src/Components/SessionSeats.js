export default function SessionSeats () {
    
    const seats = []
    for (let i = 1; i <= 50; i++) {
        if (i >= 1 && i <= 9) {
            seats.push("0" + `${i}`) 
            continue;
        }
        seats.push(`${i}`);
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
                    {seats.map(seat => 
                        <li className="seat">
                            {seat}
                        </li>)}
                </ul>
                <div className="legend-box">
                    <div className="description green">
                        <div className="circle">
                        </div>
                        <span>
                            Selecionado
                        </span>
                    </div>
                    <div className="description gray">
                        <div className="circle">
                        </div>
                        <span>
                            Disponível
                        </span>
                    </div>
                    <div className="description yellow">
                        <div className="circle">
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
                <a class="finish-button" href="sdfas">
                    Reservar assento    
                </a>
            </div>
        </div>
    )
}