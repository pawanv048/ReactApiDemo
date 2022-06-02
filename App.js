import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import Routes from './Src/Navigation/Routes';



const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Curd/> */}
      <Routes/>
      {/* <InputScreen/> */}
      {/* <Registration/> */}
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})