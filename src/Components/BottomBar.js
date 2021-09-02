export default function BottomBar ({movieName, movieURL, date, time}) {
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
                    {date !== undefined && time !== undefined ? (
                        <span className="date-and-time">
                            {`${date} - ${time}`}
                        </span> 
                    ) : (<></>)}
                </div>
            </div>
        </div>
    )
}