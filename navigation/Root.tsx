import { createStackNavigator } from "@react-navigation/stack";

const Nav = createStackNavigator();

import Tabs from "./Tabs";
import Stack from "./Stack";

const Root = () => (
  <Nav.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);

export default Root;
