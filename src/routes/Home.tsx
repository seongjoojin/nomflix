import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Loading from 'components/Loading';

const Container = styled.div`
    padding: 2rem;
`;

function Home() {
    return (
        <>
            <Container>
                Home
            </Container>
        </>
    )
}

export default Home;