import styled from 'styled-components';

export default function BottomBar ({movieName, movieURL, date, time}) {
    return (
        <BarBottom>
            <MovieContentContainer>
                <MovieImg>
                    <img src={movieURL} alt=""/>
                </MovieImg>
                <InfoBox>
                    <MovieName>
                        {movieName}
                    </MovieName>
                    {date !== undefined && time !== undefined ? (
                        <span className="date-and-time">
                            {`${date} - ${time}`}
                        </span> 
                    ) : (<></>)}
                </InfoBox>
            </MovieContentContainer>
        </BarBottom>
    )
}

const BarBottom = styled.div`
    height: 117px;
    border-top: 1px solid #9EADBA;
    background-color: #DFE6ED;
    padding: 0 15px;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
`
const MovieContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`
const MovieImg = styled.div`
    width: 64px;
    height: 89px;
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 8px;

    img {
        height: 100%;
    }
`
const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 26px;
    color: #293845;
`
const MovieName = styled.span`
    margin-bottom: 5px;
`