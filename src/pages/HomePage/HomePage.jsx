import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMovies } from '../../api'

function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMovies()
        setMovies(movies.results)
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.')
        console.error('❌ Error fetching movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>
  }

  return (
    <>
      {movies.length > 0 ? (
        <ul>
          {movies.map(el => (
            <li key={el.id}>
              <Link to={`/movies/${el.id}`}>{el.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </>
  )
}

export default HomePage
