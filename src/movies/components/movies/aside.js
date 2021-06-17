import { useCallback } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { selectMovies } from "../../slice";

function Aside() {
    const movies = useSelector(selectMovies)
    const onDelete = useCallback(
        (title) => () => {
            window.confirm(`Are you sure to delete "${title}"?`)
        },
        [],
    )
    
    return (
        <div>
            <h2>Latest movies</h2>
            <ul>
                {movies.map(({ title, release, slug }) => (
                    <li key={slug}>
                        <h3><StyledNavLink to={`/${slug}`} activeClassName='active'>{title}</StyledNavLink></h3>
                        <span>{release}</span>
                        <button onClick={onDelete(title)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const StyledNavLink = styled(NavLink)`
    &.active {
        color: var(--color-primary);
    }
`

export default Aside;
