import { useState } from "react";
import styled from 'styled-components';

export default function NavBar () {

    const [topBarColor, setTopBarColor] = useState("#C3CFD9");

    return (
        <Navbar topBarColor={topBarColor}>
            <Cineflex>
                CINEFLEX
            </Cineflex>
            <ColorInput type="color" onChange={(event) => setTopBarColor(event.target.value)} value={topBarColor}/>
        </Navbar>
    )
}

const Navbar = styled.header`
    height: 67px;
    width: 100%;
    background-color: ${({ topBarColor }) => topBarColor};
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
const ColorInput = styled.input`
    border: none;
    border-radius: 4px;
    width: 40px;
    height: 25px;
    position: fixed;
    right: 25px;
`;