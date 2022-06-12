import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useDetailsData from '../context/useDetailsData';

const ReleaseScreen = () => {
    const { data, setData} = useDetailsData();
  return (
    <View>
      <Text>ReleaseScreen "{data[0]?.Release?.Release_Id}"</Text>
    </View>
  )
}

export default ReleaseScreen

const styles = StyleSheet.create({})