import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import logo from '../../images/the-movies-db-logo.svg'

export default function Header () {
    return (
        <Wrapper>
            <Grid container justify='space-between' alignItems='center'>
                    <LogoWrapper><span>The Movie DB</span> <img src={logo} alt='The Movies DB logo' width='120px' /></LogoWrapper>
                    <Nav aria-label='Primary'>
                        <ul>
                            <li>
                            <StyledLink to='/'>
                                <Button variant='text' color='inherit' role='none' tabIndex='-1'>
                                    Home
                                </Button>
                            </StyledLink>
                            </li>
                            <li>
                            <StyledLink to='/add'>
                                <Button variant='text' color='inherit' role='none' tabIndex='-1'>
                                    Add movie
                                </Button>
                            </StyledLink>
                            </li>
                        </ul>
                    </Nav>
            </Grid>
        </Wrapper>
    )
}

const Wrapper = styled.header``

const Nav = styled.nav`
    ul {
        list-style: none;
        display: flex;
    }
`

const LogoWrapper = styled.h1`
    > span {
        display: none;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`
