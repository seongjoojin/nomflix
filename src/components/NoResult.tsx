import React from 'react';
import Helmet from 'react-helmet';
import { Data, Title } from 'routes/Detail';

const NoResult = () => (
	<Data>
		<Helmet title="No result | Nomflix" />
		<Title>No result</Title>
	</Data>
);

export default NoResult;
