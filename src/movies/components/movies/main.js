import { equals, propSatisfies } from "ramda";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { selectMovies } from "../../slice";

function Main() {
    const { params } = useRouteMatch()
    const history = useHistory()
    const movies = useSelector(selectMovies)
    const [movie, setMovie] = useState(movies[0])

    useEffect(() => {
        const targetMovie = movies.find(
            propSatisfies(
                equals(encodeURI(params.id)),
                'slug'
            )
        )
        if (targetMovie) {
            // another movie was requested
            if (movie !== targetMovie) {
                setMovie(targetMovie)
            }
        // movie was deleted
        } else if (movie !== movies[0]) {
            history.push('/')
            setMovie(movies[0])
        }
    }, [movie, movies, params, history])

    if (!movies.length) {
        return 'There are no movies yet.'
    }

    const { title, release, image, description } = movie

    return (
        <div>
            <h2>{title}</h2>
            <span>{release}</span>
            <img src={image} alt={title} />
            <p>{description}</p>
        </div>
    );
}

export default Main;
