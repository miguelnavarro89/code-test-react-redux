import { Grid } from "@material-ui/core";
import Aside from "./aside";
import Main from "./main";

function Movies() {
    
    return (
        <Grid container>
            <Aside />
            <Main />
        </Grid>
    );
}

export default Movies;
