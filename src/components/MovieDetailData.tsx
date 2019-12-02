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
	TabContent,
	TabContentItem,
	TabContentText,
	TabContentTitle
} from 'routes/Detail';

interface IProps {
	result: MovieDetail;
}

const MovieDetailData = ({ result }: IProps) => {
	const useTabs = (initialTab: number) => {
		const [currentIndex, setCurrentIndex] = useState(initialTab);
		return {
			currentIndex: currentIndex,
			changeIetm: setCurrentIndex
		};
	};
	const content = [
		{ tab: 'YT Videos' },
		{
			tab: 'Production Company & Countries'
		}
	];
	const { currentIndex, changeIetm } = useTabs(0);
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
				{content.map((section, index) => (
					<TabHeaderItem
						onClick={() => changeIetm(index)}
						active={currentIndex === index}
					>
						{section.tab}
					</TabHeaderItem>
				))}
			</TabHeader>
			<TabContent>
				{content.map((section, index) => (
					<TabContentItem active={currentIndex === index}>
						{section.tab === 'YT Videos' && (
							<>
								{result.videos.results
									.filter(item => item.site === 'YouTube')
									.map(videoResult => (
										<TabContentText>
											<a
												href={`https://www.youtube.com/watch?v=${videoResult.key}`}
											>
												{videoResult.name}
											</a>
										</TabContentText>
									))}
							</>
						)}
						{section.tab === 'Production Company & Countries' && (
							<>
								{result.production_companies.length > 0 && (
									<TabContentTitle>
										Production Companies
									</TabContentTitle>
								)}
								{result.production_companies.map(company => (
									<TabContentText>
										{company.name}&nbsp;/&nbsp;
										{company.origin_country}
									</TabContentText>
								))}
								{result.production_countries.length > 0 && (
									<TabContentTitle>
										Production Countries
									</TabContentTitle>
								)}
								{result.production_companies.map(country => (
									<TabContentText>
										{country.name}
									</TabContentText>
								))}
							</>
						)}
					</TabContentItem>
				))}
			</TabContent>
		</Data>
	);
};

export default MovieDetailData;
