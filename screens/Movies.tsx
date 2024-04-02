import { useState, useEffect } from "react";

import { Dimensions, ActivityIndicator, ScrollView } from "react-native";

import styled from "styled-components/native";

import Swiper from "react-native-swiper";

import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "bf41b52d0045ef2e38d1b4ad4f56e728"

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBgColor};
`

const ListContainer = styled.View`
  margin-bottom: 40px;
`

const ListTitle = styled.Text`
  color: blue;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`

const TrendingScroll = styled.ScrollView`
  marginTop: 20px;
`

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`

const Title = styled.Text`
  color: blue;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`
const Votes = styled.Text`
  color: green;
  font-size: 10px;
`

const HMovie = styled.View`
  margin-bottom: 30px;
  padding: 0px 30px;
  flex-direction: row;
`

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`

const Overview = styled.Text`
  width: 80%;
  color: orange;
`

const Release = styled.Text`
  color: orange;
  font-size: 12px;
  margin-vertical: 10px;
`

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    )).json();
    setNowPlaying(results);
  }

  const getUpcoming = async () => {
    const { results } = await (await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    )).json();
    setUpcoming(results);
  }

  const getTrending = async () => {
    const { results } = await (await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    )).json();
    setTrending(results);
  }

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplayTimeout={3.5}
        showsButtons={false}
        containerStyle={{
          marginBottom: 30,
          width: "100%",
          height: SCREEN_HEIGHT/4
        }}
      >
        {
          nowPlaying.map((movie) => (
            <Slide
              key={movie.id}
              backdrop_path={movie.backdrop_path}
              poster_path={movie.poster_path}
              original_title={movie.original_title}
              overview={movie.overview}
              vote_average={movie.vote_average}
            />
          ))
        }
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          contentContainerStyle={{ paddingHorizontal: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 ? "..." : null}
              </Title>
              <Votes>⭐{movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "Coming soon"}/10</Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming Soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>
              {movie.original_title}
            </Title>
            <Release>{movie.release_date}</Release>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 140
              ? `${movie.overview.slice(0, 140)}...`
              : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  )
};

export default Movies;
