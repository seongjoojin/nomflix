import React from 'react';
import Helmet from 'react-helmet';
import { TvDetail } from 'api';
import {
	Data,
	ItemContainer,
	Title,
	Item,
	Divider,
	Overview
} from 'routes/Detail';

interface IProps {
	result: TvDetail;
}

const TVDetailData = ({ result }: IProps) => (
	<Data>
		<Helmet title={`${result.name} | Nomflix`} />
		<a
			href={`https://www.imdb.com/title/${result.external_ids.imdb_id}`}
			target="_blank"
		>
			<Title>{result.name}</Title>
			<ItemContainer>
				<Item>{result.first_air_date.substring(0, 4)}</Item>
				<Divider>•</Divider>
				<Item>{result.episode_run_time[0]} min</Item>
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

export default TVDetailData;
