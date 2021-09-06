import { useHistory } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import styled from 'styled-components';

export default function GoBackButton () {

    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }
    return (
        <ButtonGoBack onClick={goBack}><IoMdArrowRoundBack /></ButtonGoBack>
    )
}

const ButtonGoBack = styled.button`
    width: 40px;
    height: 30px;
    border: none;
    border-radius: 3px;
    background-color: rgb(46, 93, 179);
    color: #ffffff;
    left: 22px;
    z-index: 5;
    position: fixed;
    top: 19px;
    font-size: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`