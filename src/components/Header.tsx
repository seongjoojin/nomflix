import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'; 
import styled from 'styled-components';

const Navigation = styled.header`
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    background-color: rgba(20, 20, 20, 0.8);
    z-index: 10;
    box-shadow: 0 0.1rem 0.5rem 0.2rem rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
    display: flex;
`;

const ListItem = styled.li<{ current: boolean }>`
    width: 8rem;
    height: 5rem;
    text-align: center;
    border-bottom: 0.3rem solid
    ${props => (props.current ? '#3498db' : 'transparent')};
    transition: border-bottom 0.5s ease-in-out;
`;

const StyledLink = styled(Link)`
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginLink = styled(Link)`
    display: inline-block;
    width: 8rem;
    text-align: center;
    height: 5rem;
    line-height: 5rem;
    position: absolute;
    top: 0;
    right: 0;
`;

function Header({ location: { pathname } }: RouteComponentProps) {
    return (
        <Navigation>
            <List>
                <ListItem current={pathname === '/'}> 
                    <StyledLink to="/">
                        Movies
                    </StyledLink>
                </ListItem>
                <ListItem current={pathname === '/search'}> 
                    <StyledLink to="/search">
                        Search
                    </StyledLink>
                </ListItem>
            </List>
            <LoginLink to="/login">Login</LoginLink>
        </Navigation>
    )
}

export default withRouter(Header);