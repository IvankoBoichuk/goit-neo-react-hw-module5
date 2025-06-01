import { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { getMovie } from '../../api'
import styles from './MovieDetailsPage.module.css'

function MovieDetailsPage() {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { movieId } = useParams()

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
                        <li><Link to="cast">Cast</Link></li>
                        <li><Link to="reviews">Reviews</Link></li>
                    </ul>
                </nav>
            </section>
            <Outlet />
        </>
    )
}

export default MovieDetailsPage
