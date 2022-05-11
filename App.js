import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import CoffeeAutonomous from './CoffeeAutonomous/CoffeeAutonomous';
import FlatlistComponent from './CoffeeAutonomous/FlatlistComponent';




const App = () => {
  return (
     <View style={{ flex: 1}}>
          <FlatlistComponent/>
        </View>
  )
}

export default App

const styles = StyleSheet.create({})


// View style={{ flex: 1}}>
//       <CoffeeAutonomous/>
//     </View>
//   