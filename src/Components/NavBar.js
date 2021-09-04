import styled from 'styled-components';

export default function NavBar () {
    return (
        <Navbar>
            <Cineflex>
                CINEFLEX
            </Cineflex>
        </Navbar>
    )
}

const Navbar = styled.header`
    height: 67px;
    width: 100%;
    background-color: #C3CFD9;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
`
const Cineflex = styled.span`
    color: #E8833A;
    font-size: 34px;
`