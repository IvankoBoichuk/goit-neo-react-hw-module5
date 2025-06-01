import { useEffect, useState } from "react";
import { getCast } from "../../api";
import { useParams } from "react-router-dom";

const MovieCast = () => {
    const [cast, setCast] = useState([])
    const { movieId } = useParams()

    useEffect(() => {
        const featchCast = async () => {
            const cast = await getCast(movieId)
            setCast(cast.cast)
        }
        featchCast()
    }, [movieId]);

    return <section>
        <ul>
            {cast.map(actor => <li key={actor.id}>
                {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} width={100} />}
                {actor.name && <div>{actor.name}</div>}
                {actor.character && <div>Character: {actor.character}</div>}
            </li>)}
        </ul>
    </section>
}

export default MovieCast;