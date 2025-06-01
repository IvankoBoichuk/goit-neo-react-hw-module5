import { Link, useLocation } from "react-router-dom";

const MovieList = ({movies}) => {
    const location = useLocation()
    return <ul>
        {movies.map(el => (
            <li key={el.id}>
                <Link to={`/movies/${el.id}`} state={location}>{el.title}</Link>
            </li>
        ))}
    </ul>
}

export default MovieList;