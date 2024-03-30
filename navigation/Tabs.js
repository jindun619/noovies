import { Text, useColorScheme } from "react-native";

import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

import { Ionicons } from '@expo/vector-icons';

import { YELLOW_COLOR, BLACK_COLOR } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: "600"
        }
      }}
    >
      <Tab.Screen name="Movies" component={Movies} options={{
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="film-outline" size={size} color={color} />
        }
      }} />
      <Tab.Screen name="TV" component={Tv} options={{
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="tv-outline" size={size} color={color} />
        }
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="search-outline" size={size} color={color} />
        }
      }} />
    </Tab.Navigator>
  )
}

export default Tabs;