import { Route, Routes } from 'react-router-dom'
import './App.css'
import MovieReviews from './components/MovieReviews/MovieReviews'
import MovieCast from './components/MovieCast/MovieCast'
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import HomePage from './pages/HomePage/HomePage'
import BaseLayout from './layouts/BaseLayout/BaseLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
