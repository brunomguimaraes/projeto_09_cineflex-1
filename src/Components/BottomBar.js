export default function BottomBar ({movieName, movieURL}) {
    return (
        <div className="bottom-bar">
            <div className="movie-content-container">
                <div className="movie-img">
                    <img src={movieURL} alt=""/>
                </div>
                <div className="info-box">
                    <span className="movie-name">
                        {movieName}
                    </span>
                    {/* <span className="date-and-time">
                        Quinta-feira 15:00
                    </span> */}
                </div>
            </div>
        </div>
    )
}