import { View, Text, TouchableOpacity } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';

const ScreenOne = ({ navigation: { navigate } }) => <TouchableOpacity onPress={()=>navigate("Two")}>
  <Text>One</Text>
</TouchableOpacity>;
const ScreenTwo = ({ navigation: { goBack } }) => <TouchableOpacity onPress={()=>goBack()}>
  <Text>
    Two
  </Text>
</TouchableOpacity>;
const ScreenThree= ({ navigation: { navigate } }) => <TouchableOpacity onPress={()=>navigate("Tabs", { screen: "Search" })}>
  <Text>
    Three
  </Text>
</TouchableOpacity>;

const NativeStack = createStackNavigator();

const Stack = () => <NativeStack.Navigator>
  <NativeStack.Screen name="One" component={ScreenOne} options={{title: "1"}} />
  <NativeStack.Screen name="Two" component={ScreenTwo} />
  <NativeStack.Screen name="Three" component={ScreenThree} />
</NativeStack.Navigator>

export default Stack;