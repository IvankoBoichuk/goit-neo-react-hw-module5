import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'

// Lazy imports
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'))
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const BaseLayout = lazy(() => import('./layouts/BaseLayout/BaseLayout'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  )
}

export default App