import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { TvDetail } from 'api';
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
	TabContentTitle,
	TVSeasonContainer,
	TVSeasonContent,
	TVSeasonPoster,
	TVSeasonText
} from 'routes/Detail';

interface IProps {
	result: TvDetail;
}

const TVDetailData = ({ result }: IProps) => {
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
		},
		{
			tab: 'TV Seasons'
		}
	];
	const { currentIndex, changeIetm } = useTabs(0);
	return (
		<Data>
			<Helmet title={`${result.name} | Nomflix`} />
			<Title>
				<a
					href={`https://www.imdb.com/title/${result.external_ids.imdb_id}`}
					target="_blank"
				>
					{result.name}
				</a>
			</Title>
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
								{result.origin_country && (
									<TabContentTitle>
										Production Country
									</TabContentTitle>
								)}
								<TabContentText>
									{result.origin_country[0]}
								</TabContentText>
							</>
						)}
						{section.tab === 'TV Seasons' && (
							<>
								{result.seasons.length > 0 && (
									<TabContentTitle>
										TV Seasons
									</TabContentTitle>
								)}
								<TVSeasonContainer>
									{result.seasons.length > 0 &&
										result.seasons.map(season => (
											<TVSeasonContent>
												<TVSeasonPoster
													img_url={season.poster_path}
												/>
												<TVSeasonText>
													{season.name}
												</TVSeasonText>
											</TVSeasonContent>
										))}
								</TVSeasonContainer>
							</>
						)}
					</TabContentItem>
				))}
			</TabContent>
		</Data>
	);
};

export default TVDetailData;
