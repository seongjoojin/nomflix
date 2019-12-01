import React from 'react';
import Helmet from 'react-helmet';
import { MovieDetail } from 'api';
import {
	Data,
	ItemContainer,
	Title,
	Item,
	Divider,
	Overview
} from 'routes/Detail';

interface IProps {
	result: MovieDetail;
}

const MovieDetailData = ({ result }: IProps) => (
	<Data>
		<Helmet title={`${result.title} | Nomflix`} />
		<a
			href={`https://www.imdb.com/title/${result.imdb_id}`}
			target="_blank"
		>
			<Title>{result.title}</Title>
			<ItemContainer>
				<Item>{result.release_date.substring(0, 4)}</Item>
				<Divider>•</Divider>
				<Item>{result.runtime} min</Item>
				<Divider>•</Divider>
				<Item>
					{result.genres &&
						result.genres.map((genre, index) =>
							index === result.genres.length - 1
								? genre.name
								: `${genre.name} / `
						)}
				</Item>
			</ItemContainer>
			<Overview>{result.overview}</Overview>
		</a>
	</Data>
);

export default MovieDetailData;
