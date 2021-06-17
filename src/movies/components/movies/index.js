import { Button, Grid } from "@material-ui/core";
import { always, cond, equals, T } from "ramda";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
                [equals('failed'), always('An Error occurred, try later...')],
                [T, always(
                    <>
                        <Aside />
                        <Main />
                        <AddLink to='/add'>
                            <Button color='primary' role='none' tabIndex='-1'>
                                Add new movie
                            </Button>
                        </AddLink>
                    </>
                )],
            ])(status)}
        </Grid>
    );
}

const AddLink = styled(Link)``

export default Movies;
