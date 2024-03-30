import { useState, useEffect } from "react";

import { Text, useColorScheme, Image } from "react-native";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useAssets } from 'expo-asset';

import { Ionicons } from "@expo/vector-icons";

import Tabs from "./navigation/Tabs";
import Stacks from "./navigation/Stacks";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [assets] = useAssets([require("./assets/snack-icon.png"), "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj-MRo2d3nUWEocLcGirrE1izc-GbnqSfW3EIcobLCxA&s"]);
  const [loaded] = useFonts([Ionicons.font]);

  const preLoad = async () => {
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    preLoad();
  }, []);

  const isDark = useColorScheme() === "dark";
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stacks />
    </NavigationContainer>
  );
}
