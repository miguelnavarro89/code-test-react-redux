import { useCallback } from "react";
import { useSelector } from "react-redux";
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
                {movies.map(({ title, release }) => (
                    <li>
                        <h3>{title}</h3>
                        <span>{release}</span>
                        <button onClick={onDelete(title)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Aside;
