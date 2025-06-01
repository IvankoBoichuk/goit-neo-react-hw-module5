import axios from "axios";

const API_TOKEN = import.meta.env.VITE_API_TOKEN

axios.defaults.baseURL = "https://api.themoviedb.org/3/"
axios.defaults.headers = {
    Authorization: `Bearer ${API_TOKEN}`
}

const getData = async (endpoint) => {
    const request = await axios.get(endpoint);
    return request.data;
}

export const getMovies = async () => {
    return getData("trending/movie/day");
}

export const getMovie = async (movie_id) => {
    return getData(`movie/${movie_id}`);
}

export const getCast = async (movie_id) => {
    return getData(`movie/${movie_id}/credits`);
}

export const getReviews = async (movie_id) => {
    return getData(`movie/${movie_id}/reviews`);
}

export const getSearchedMovie = async (query) => {
    return getData(`search/movie?query=${query}`)
}