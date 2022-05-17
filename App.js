import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import Routes from './Src/Navigation/Routes';
import Curd from './Src/Screens/curdOpertion';
import InputScreen from './Src/Screens/inputScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      {/* <Curd/> */}
      <Routes/>
      {/* <InputScreen/> */}
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})