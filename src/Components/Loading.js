import styled from 'styled-components';

export default function Loading () {
    return (
        <LoadingPage>
            <OneRingGif src="./imagens/one-ring.gif" alt=""/>
            <GandalfGif src="./imagens/gandalf.gif" alt=""/>
        </LoadingPage>
    )
}

const LoadingPage = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const OneRingGif = styled.img`
    width: 150px;
    margin-top: 140px;
`
const GandalfGif = styled.img`
    width: 300px;
    margin-top: 20px;
`