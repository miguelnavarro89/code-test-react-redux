import { format } from 'date-fns'
import { Button } from '@material-ui/core';
import { Delete } from "@material-ui/icons";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { actions, selectMovies } from "../../slice";

function Aside() {
    const movies = useSelector(selectMovies)
    const dispatch = useDispatch()
    const onDelete = useCallback(
        (title) => (event) => {
            event.preventDefault()
            const assured = window.confirm(`Are you sure to delete "${title}"?`)
            if (assured) {
                dispatch(actions.delete(title))
            }
        },
        [dispatch],
    )

    if (!movies.length) {
        return null
    }
    
    return (
        <Wrapper>
            <h2>Latest movies</h2>
            <ul>
                {movies.map(({ title, release, slug }) => (
                    <li key={slug}>
                        <StyledNavLink to={`/${slug}`} activeClassName='active'>
                            <div>
                                <h3 className='title'>{title}</h3>
                                <span className='release'>{format(new Date(release), 'MMM do, y')}</span>
                            </div>
                            {/* TODO: use a material-ui modal dialog instead of the native confirm dialog */}
                            <Button color='secondary' className='delete-button' onClick={onDelete(title)} aria-label={`Delete movie ${title}`}>
                                <Delete />
                            </Button>
                        </StyledNavLink>
                    </li>
                ))}
            </ul>
            <AddLink to='/add'>
                <Button variant='outlined' color='inherit' role='none' tabIndex='-1'>
                    Add new movie
                </Button>
            </AddLink>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    width: 25%;
    background-color: var(--color-bg-aside, --color-bg-primary);
    overflow-y: auto;
    --webkit-overflow-scrolling: touch;

    ul, li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
`

const AddLink = styled(Link)`
    position: absolute;
    bottom: 1em;
    left: 1em;
    text-decoration: none;
    color: var(--color-primary);
`

const StyledNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
    font-size: 14px;
    color: #ccc;
    text-decoration: none;
    border-bottom: solid 1px #333;

    &.active {
        color: var(--color-primary);
    }

    .title {
        margin: 0 0 .1em;
    }

    .release {
        font-size: 12px;
        text-decoration: none;
    }
`

export default Aside;
