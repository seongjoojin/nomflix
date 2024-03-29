import React, { ReactChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	:not(:last-child) {
		margin-bottom: 50px;
	}
`;

const Title = styled.span`
	font-size: 14px;
	font-weight: 600;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 125px);
	grid-gap: 25px;
	margin-top: 25px;
`;

interface IProps {
	title: string;
	children: ReactChildren | JSX.Element[];
}

const Section = ({ title, children }: IProps) => (
	<Container>
		<Title>{title}</Title>
		<Grid>{children}</Grid>
	</Container>
);

export default Section;
