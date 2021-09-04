import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex";
const getMovies = () => axios.get(`${URL}/movies`);
const getMoviesById = (id) => axios.get(`${URL}/movies/${id}/showtimes`);
const getSessionSeats = (id) => axios.get(`${URL}/showtimes/${id}/seats`);
const postRequest = (data) => axios.post(`${URL}/seats/book-many`, data);

export {
    getMovies,
    getMoviesById,
    getSessionSeats,
    postRequest
}