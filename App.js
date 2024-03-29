import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";

import { Text } from "react-native";
import Tabs from "./navigation/Tabs";

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
