import { format } from "date-fns";
import { equals, propSatisfies } from "ramda";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
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
        <Wrapper>
            <h2 className='title'>{title}</h2>
            <div className='release'><strong>Release Date</strong>: {format(new Date(release), 'MMM do, y')}</div>
            <figure className='cover'>
                <img src={image} alt={title} />
            </figure>
            <p className='desc'>{description}</p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 62%;
    padding: 0 0 0 3%;
    background-color: var(--color-bg-main, --color-bg-primary);
    overflow-y: auto;
    --webkit-overflow-scrolling: touch;

    .title {}

    .release {
        font-size: 12px;
    }

    .cover {
        display: inline-block;
        padding: .38em;
        margin: 1em 0;
        border: solid 1px #333;

        img {
            max-height: 270px;
        }
    }

    .desc {
        max-width: 62%;
        line-height: 1.6em;
    }
`

export default Main;
