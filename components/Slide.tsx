import React from "react";
import styled from "styled-components/native";
import { View, StyleSheet, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";

import Poster from "./Poster";

import { makeImgPath } from "../utils";

const BgImg = styled.Image`
`

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`

const Votes = styled(Overview)`
  font-size: 12px;
`

interface SlideProps {
  backdrop_path: string,
  poster_path: string,
  original_title: string,
  overview: number,
  vote_average: string,
}

const Slide: React.FC<SlideProps> = ({ backdrop_path, poster_path, original_title, overview, vote_average }) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{uri: makeImgPath(backdrop_path)}}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title>{original_title}</Title>
            <Overview>{overview.slice(0, 90)}...</Overview>
            <Votes>⭐{vote_average > 0 ? vote_average.toFixed(1) : null}/10</Votes>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  )
}

export default Slide;