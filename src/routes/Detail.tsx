import React, { useState, useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { moviesAPI, tvAPI, MovieDetail, TvDetail } from 'api';
import Loading from 'components/Loading';
import MovieDetailData from 'components/MovieDetailData';
import TVDetailData from 'components/TVDetailData';
import NoResult from 'components/NoResult';

const Container = styled.div`
	height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	padding: 50px;
`;

const Backdrop = styled.div<{ bgURL: string }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url(${props => props.bgURL});
	background-position: center center;
	background-size: cover;
	filter: blur(3px);
	opacity: 0.5;
	z-index: 0;
`;

const Content = styled.div`
	display: flex;
	width: 100%;
	position: relative;
	z-index: 1;
	height: 100%;
`;

const Cover = styled.div<{ bgURL: string }>`
	width: 30%;
	background-image: url(${props => props.bgURL});
	background-position: center center;
	background-size: cover;
	height: 100%;
	border-radius: 5px;
`;

export const Data = styled.div`
	width: 70%;
	margin-left: 40px;
`;

export const Title = styled.h3`
	font-size: 32px;
	a {
		text-decoration: underline;
	}
`;

export const ItemContainer = styled.div`
	margin: 20px 0;
`;

export const Item = styled.span``;

export const Divider = styled.span`
	margin: 0 10px;
`;

export const Overview = styled.p`
	font-size: 16px;
	opacity: 0.7;
	line-height: 1.5;
	width: 50%;
`;

export const TabHeader = styled.div`
	padding: 16px 0;
	display: flex;
`;

export const TabHeaderItem = styled.button<{ active: boolean }>`
	font-size: 14px;
	font-weight: ${props => (props.active ? 'bold' : 'normal')};
	text-decoration: ${props => (props.active ? 'underline' : 'none')};
	padding: 8px;
	background: none;
	outline: none;
	border: none;
	color: #fff;
	cursor: pointer;
`;

export const TabContent = styled.div``;

export const TabContentItem = styled.div<{ active: boolean }>`
	display: ${props => (props.active ? 'underline' : 'none')};
`;

export const TabContentText = styled.p`
	margin-bottom: 16px;
	a {
		text-decoration: underline;
	}
`;

export const TabContentTitle = styled.h6`
	margin-bottom: 16px;
	font-size: 14px;
	font-weight: bold;
`;

export const TVSeasonContainer = styled.ul`
	display: flex;
`;

export const TVSeasonContent = styled.li`
	display: flex;
`;

export const TVSeasonPoster = styled.div<{ img_url: string | null }>`
	width: 120px;
	height: 160px;
	background-image: ${props =>
		props.img_url
			? `url(https://image.tmdb.org/t/p/original${props.img_url})`
			: ''};
	background-position: center center;
	background-size: cover;
	border-radius: 5px;
	margin-right: 8px;
`;

export const TVSeasonText = styled.p`
	margin-right: 8px;
`;

interface Iparams {
	id: string | undefined;
}

const useFetch = (id: any) => {
	const { pathname } = useLocation();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<ErrorEvent | null>(null);
	const [result, setResult] = useState<MovieDetail | TvDetail | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				if (id) {
					const movieId = parseInt(id);
					if (pathname.includes('/movie/')) {
						const { data } = await moviesAPI.movieDetail(movieId);
						setResult(data);
					} else {
						const { data } = await tvAPI.showDetail(movieId);
						setResult(data);
					}
				} else {
					throw Error('Id is undefined.');
				}
			} catch (e) {
				setError(e);
				setResult(null);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [pathname, id]);

	return { loading, result, error };
};

const renderData = (result: MovieDetail | TvDetail) => {
	if ('title' in result) {
		return <MovieDetailData result={result} />;
	} else if ('original_name' in result) {
		return <TVDetailData result={result} />;
	}
	return null;
};

const Detail = () => {
	const match = useRouteMatch<Iparams>(['/movie/:id', '/show/:id']);
	const { loading, result } = useFetch(match && match.params.id);
	return (
		<>
			{loading ? (
				<>
					<Helmet title="Loading | Nomflix" />
					<Loading />
				</>
			) : (
				<Container>
					{result ? (
						<>
							<Backdrop
								bgURL={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
							/>
							<Content>
								<Cover
									bgURL={
										result.poster_path
											? `https://image.tmdb.org/t/p/original${result.poster_path}`
											: require('assets/noPosterSmall.png')
									}
								/>
								{renderData(result)}
							</Content>
						</>
					) : (
						<Content>
							<NoResult />
						</Content>
					)}
				</Container>
			)}
		</>
	);
};

export default Detail;
