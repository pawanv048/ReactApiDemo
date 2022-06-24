import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useDetailsData from '../context/useDetailsData';

const ExclusiveScreen = () => {
    const { data, setData} = useDetailsData();
  return (
    <View>
      <Text>ExclusiveScreen "{data[0]?.Release?.Release_Id}"</Text>
    </View>
  )
}

export default ExclusiveScreen

const styles = StyleSheet.create({})