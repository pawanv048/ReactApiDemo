import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//By default index file is been routes
import { CoffeeAutonomous, Detail } from '../Screens'
import navigationStrings from '../../constants/navigationStrings';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={navigationStrings.COFFEEAUTONOMOUS} >
        <Stack.Screen name={navigationStrings.COFFEEAUTONOMOUS} component={CoffeeAutonomous} options={{ title: 'Home' }}/>
        <Stack.Screen name={navigationStrings.DETAIL} component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;