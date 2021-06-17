import { Grid, Button } from '@material-ui/core';
import { map } from 'ramda';
import { NavLink, Link } from 'react-router-dom'
import styled from 'styled-components';
import logo from '../../images/the-movies-db-logo.svg'

const menu = [
    {
        label: 'Home',
        route: '/', 
    },
    {
        label: 'Add movie',
        route: '/add', 
    }
]

const mapWithMenuItem = map(({ label, route }) => 
    <li key={label}>
        <StyledLink to={route} activeClassName='active' exact>
            <Button variant='text' color='inherit' role='none' tabIndex='-1'>
                {label}
            </Button>
        </StyledLink>
    </li>
)

export default function Header () {
    return (
        <Wrapper>
            <Grid container justify='space-between' alignItems='center'>
                    <LogoWrapper>
                        <span>The Movie DB</span> 
                        <Link to='/'><img src={logo} alt='The Movies DB logo' width='120px' /></Link>
                    </LogoWrapper>
                    <Nav aria-label='Primary'>
                        <ul>{mapWithMenuItem(menu)}</ul>
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

const StyledLink = styled(NavLink)`
    text-decoration: none;

    &.active {
        color: var(--color-primary);
    }
`
