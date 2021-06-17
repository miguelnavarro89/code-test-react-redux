import { Grid } from "@material-ui/core";
import { always, cond, equals, T } from "ramda";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll, selectStatus } from "../../slice";
import Aside from "./aside";
import Main from "./main";

function Movies() {
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)
    
    useEffect(() => {
        dispatch(fetchAll())
    }, [dispatch])

    return (
        <Grid container>
            {cond([
                [equals('pending'), always('Loading...')],
                [equals('failed'), always('An rrror occurred, try later...')],
                [T, always(
                    <>
                        <Aside />
                        <Main />
                    </>
                )],
            ])(status)}
        </Grid>
    );
}

export default Movies;
