import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './Src/Navigation/Routes'

const App = () => {
  return (
    <View style={{ flex: 1}}>
      <Routes/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})