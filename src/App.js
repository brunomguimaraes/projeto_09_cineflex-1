import React from "react";
import "./css/reset.css";
import "./css/mainpage.css";
import "./css/review.css";
import "./css/seats.css";
import "./css/sessions.css";
import "./css/bottombar.css";
import "./css/navbar.css";
import "./css/style.css";

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import axios from 'axios';
import NavBar from "./Components/NavBar";
import MainPage from "./Components/MainPage";
import MovieSessions from "./Components/MovieSessions";
import SessionSeats from "./Components/SessionSeats";
import BottomBar from "./Components/BottomBar";
import RequestReview from "./Components/RequestReview";

export default function App () {

    return (
        <>
            <Router>
                <NavBar />

                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    
                    <Route exact path="/sessions">
                        <MovieSessions />
                    </Route>

                    <Route exact path="/seats">
                        <SessionSeats />
                        <BottomBar/>
                    </Route>

                    <Route exact path="/sucess">
                        <RequestReview />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}