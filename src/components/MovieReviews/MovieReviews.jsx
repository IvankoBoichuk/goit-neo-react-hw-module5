import { useEffect, useState } from "react";
import { getReviews } from "../../api";
import { useParams } from "react-router-dom";


const MovieReviews = () => {
    const [reviews, setReviews] = useState([])
    const { movieId } = useParams()
    
    useEffect(() => {
        const featchReviews = async () => {
            const reviews = await getReviews(movieId)
            setReviews(reviews.results)
        }
        featchReviews()
    }, [movieId]);

    return <section>
        {reviews.length > 0 ? <ul>
            {reviews.map(review => <li key={review.id}>
                {review.author && <div><b>Author {review.author}</b></div>}
                {review.content && <div>{review.content}</div>}
            </li>)}
        </ul> : "We don't have any review about this movie"}
    </section>
}

export default MovieReviews;