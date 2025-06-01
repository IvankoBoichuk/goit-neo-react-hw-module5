import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useParams, Link } from 'react-router-dom'
import { getMovie } from '../../api'
import styles from './MovieDetailsPage.module.css'

function MovieDetailsPage() {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { movieId } = useParams()
    const location = useLocation()
    const ref = useRef(location.state)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movie = await getMovie(movieId)
                setMovie(movie)
            } catch (err) {
                setError('Failed to load movie details. Please try again later.')
                console.error('❌ Error fetching movie:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchMovie()
    }, [movieId])

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <>
            {movie && <Link to={ref.current ?? "/movies"}>← Back</Link>}
            {movie && <MovieDetails movie={movie} />}
        </>
    )
}

const MovieDetails = ({ movie: { title, poster_path, popularity, overview, genres } }) => {
    return (
        <>
            <section className={styles.MovieDetailsPage}>
                {poster_path && <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />}
                <div>
                    {title && <h1>{title}</h1>}
                    {popularity && <span>User Score: {popularity.toFixed(2)}%</span>}
                    {overview && <div>
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </div>}
                    {genres && <div>
                        <h2>Genres</h2>
                        <ul>{genres.map(el => <li key={el.id}>{el.name}</li>)}</ul>
                    </div>}
                </div>
            </section>
            <hr />
            <section>
                <p>Additional information</p>
                <nav>
                    <ul>
                        <li><NavLink to="cast">Cast</NavLink></li>
                        <li><NavLink to="reviews">Reviews</NavLink></li>
                    </ul>
                </nav>
            </section>
            <Outlet />
        </>
    )
}

export default MovieDetailsPage
