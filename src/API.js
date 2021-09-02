import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex";

const getMovies = () => axios.get(`${URL}/movies`);

const getMoviesById = (id) => axios.get(`${URL}/movies/${id}/showtimes`);

export {
    getMovies,
    getMoviesById
}