import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoffeeAutonomous from '../Screens/CoffeeAutonomous';
import Detail from '../Screens/Detail';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="CoffeeAutonomous" >
        <Stack.Screen name="CoffeeAutonomous" component={CoffeeAutonomous} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;