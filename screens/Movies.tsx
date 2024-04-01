import { useState, useEffect } from "react";

import { Dimensions, ActivityIndicator, StyleSheet } from "react-native";

import styled from "styled-components/native";

import Swiper from "react-native-web-swiper";
import { BlurView } from "expo-blur";

import { makeImgPath } from "../utils";

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const View = styled.View`
  flex: 1;
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBgColor};
`

const BgImg = styled.Image`

`

const Title = styled.Text`

`

const API_KEY = "bf41b52d0045ef2e38d1b4ad4f56e728"

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    )).json();
    setNowPlaying(results);
    setLoading(false);
  }

  useEffect(() => {
    getNowPlaying();
  }, [])

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper loop timeout={3.5} controlsEnabled={false} containerStyle={{ width: "100%", height: SCREEN_HEIGHT/4 }}>
        {
          nowPlaying.map((movie) => (
            <View key={movie.id}>
              <BgImg style={StyleSheet.absoluteFill} source={{uri:makeImgPath(movie.backdrop_path)}} />
              <BlurView intensity={80} style={StyleSheet.absoluteFill}>
                <Title>{movie.original_title}</Title>
              </BlurView>
            </View>
          ))
        }
      </Swiper>
    </Container>
  )
};

export default Movies;
