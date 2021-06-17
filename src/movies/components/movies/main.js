import { useSelector } from "react-redux";
import { selectMovie } from "../../slice";

function Main() {
    const { title, release } = useSelector(selectMovie)
    
    return (
        <div>
            <h2>{title}</h2>
            <span>{release}</span>
        </div>
    );
}

export default Main;
