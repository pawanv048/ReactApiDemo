import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useDetailsData from '../context/useDetailsData';

const TrackScreen = () => {
  const {data, setData} = useDetailsData();
  return (
    <View>
      <Text>TrackScreen "{data[0]?.Release?.Release_Id}"</Text>
    </View>
  );
};

export default TrackScreen;

const styles = StyleSheet.create({});
