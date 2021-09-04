import { useHistory } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../css/goback.css";

export default function GoBackButton () {

    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }
    return (
        <button className="go-back-button" onClick={goBack}><IoMdArrowRoundBack /></button>
    )
}