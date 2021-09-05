import React from "react";
import "./css/reset.css";
import "./css/style.css";
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import { useState } from "react";
import NavBar from "./Components/NavBar";
import MainPage from "./Components/MainPage";
import MovieSessions from "./Components/MovieSessions";
import SessionSeats from "./Components/SessionSeats";
import RequestReview from "./Components/RequestReview";

export default function App () {

    const [allUserData, SetAllUserData] = useState();
    const getAllUserChoicesDataToSend = (choices) => {
        SetAllUserData(choices);
    }

    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route exact path="/sessions/:movieId">
                        <MovieSessions />
                    </Route>
                    <Route exact path="/seats/:sessionId">
                        <SessionSeats getAllUserChoicesDataToSend={getAllUserChoicesDataToSend}/>
                    </Route>
                    <Route exact path="/sucess">
                        <RequestReview movieAndDateAndUserInfo={allUserData} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}