import { Formik } from "formik";
import { getSearchedMovie } from "../../api";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(null);
                const searchedMovie = await getSearchedMovie(query);
                setMovies(searchedMovie.results);
            } catch (err) {
                setError("❌ Failed to fetch movies.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchMovie();
        } else {
            setMovies([]);
        }
    }, [query]);

    return (
        <>
            <Formik
                initialValues={{ query: query }}
                enableReinitialize
                validate={(values) => {
                    const errors = {};
                    if (!values.query) {
                        errors.query = "Required";
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSearchParams({ query: values.query });
                    setSubmitting(false); // useEffect will handle data fetching
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="search"
                            name="query"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.query}
                        />
                        {errors.query && touched.query && (
                            <div style={{ color: "red" }}>{errors.query}</div>
                        )}
                        <button type="submit" disabled={isSubmitting}>
                            Search
                        </button>
                    </form>
                )}
            </Formik>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <>
                    {movies.length > 0 ? (
                        <ul>
                            {movies.map((el) => (
                                <li key={el.id}>
                                    <Link to={`/movies/${el.id}`}>{el.title}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        query && <p>😢 Sorry, we've found nothing.</p>
                    )}
                </>
            )}
        </>
    );
};

export default MoviesPage;
