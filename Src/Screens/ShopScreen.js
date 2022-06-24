import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useDetailsData from '../context/useDetailsData';

const ShopScreen = () => {
    const { data, setData} = useDetailsData();
  return (
    <View>
      <Text>ShopScreen "{data[0]?.Release?.Release_Id}"</Text>
    </View>
  )
}

export default ShopScreen

const styles = StyleSheet.create({})