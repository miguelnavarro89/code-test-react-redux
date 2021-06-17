import { equals, propSatisfies } from "ramda";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectMovies } from "../../slice";

function Main() {
    const location = useLocation()
    const movies = useSelector(selectMovies)
    const [movie, setMovie] = useState(movies[0] || {})

    useEffect(() => {
        if (location.pathname) {
            const selectedMovie = movies.find(
                propSatisfies(
                    equals(encodeURI(location.pathname.slice(1))),
                    'slug'
                )
            )
            selectedMovie && setMovie(selectedMovie)
        }
    }, [movies, location.pathname])

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
