import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { MovieDetail } from 'api';
import {
	Data,
	ItemContainer,
	Title,
	Item,
	Divider,
	Overview,
	TabHeader,
	TabHeaderItem,
	TabContent
} from 'routes/Detail';

interface IProps {
	result: MovieDetail;
}

const MovieDetailData = ({ result }: IProps) => {
	const useTabs = (initialTab: number, allTabs: any[]) => {
		const [currentIndex, setCurrentIndex] = useState(initialTab);
		return {
			currentItem: allTabs[currentIndex],
			changeIetm: setCurrentIndex
		};
	};
	return (
		<Data>
			<Helmet title={`${result.title} | Nomflix`} />
			<Title>
				<a href={`https://www.imdb.com/title/${result.imdb_id}`}>
					{result.title}
				</a>
			</Title>
			<ItemContainer>
				<Item>{result.release_date.substring(0, 4)}</Item>
				<Divider>•</Divider>
				<Item>{result.runtime}</Item>
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
			<TabHeader>
				<TabHeaderItem active={true}>YT Videos</TabHeaderItem>
				<TabHeaderItem active={false}>
					Production Company & Countries
				</TabHeaderItem>
				<TabContent></TabContent>
			</TabHeader>
		</Data>
	);
};

export default MovieDetailData;
