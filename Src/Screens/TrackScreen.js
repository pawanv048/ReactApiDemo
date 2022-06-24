import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import useDetailsData from '../context/useDetailsData';
import moment from 'moment-timezone';

const TrackScreen = () => {
  const {data, setData} = useDetailsData();
  return (
    <View>
    <FlatList
      data={data}
      renderItem={() => (
        <View style={{ margin: 15}}>
          <Text>Track Disc: "{data[0]?.Tracks?.Track_Disc}"</Text>
          <Text>Track Track: "{data[0]?.Tracks?.Track_Track}"</Text>
          <Text>Track Artist: "{data[0]?.Tracks?.Track_Artist}"</Text>
          <Text>Track DisplayArtist: "{data[0]?.Tracks?.Track_DisplayArtist}"</Text>
          <Text>Track Title: "{data[0]?.Tracks?.Track_Title}"</Text>
          <Text>Track MixVersion: "{data[0]?.Tracks?.Track_MixVersion}"</Text>
          <Text>Track Remixer: "{data[0]?.Tracks?.Track_Remixer}"</Text>
          <Text>Track MainGenre: "{data[0]?.Tracks?.Track_MainGenre}"</Text>
          <Text>Track SubGenre: "{data[0]?.Tracks?.Track_SubGenre}"</Text>
          <Text>Track ISRC: "{data[0]?.Tracks?.Track_ISRC}"</Text>
          <Text>Track AlbumOnly: "{data[0]?.Tracks?.Track_AlbumOnly}"</Text>
          <Text>Track AudioFile: "{data[0]?.Tracks?.Track_AudioFile}"</Text>
          <Text>Track FeaturedArtist: "{data[0]?.Tracks?.Track_FeaturedArtist}"</Text>
          <Text>Track Date "{moment(new Date(data[0]?.Tracks?.Track_Date)).format('DD-MM-YYYY')}"</Text>
          <Text>Track Explicit: "{data[0]?.Tracks?.Track_Explicit}"</Text>
          <Text>Track Orchestra: "{data[0]?.Tracks?.Orchestra}"</Text>
          <Text>Track Conductor: "{data[0]?.Tracks?.Conductor}"</Text>
          <Text>Track Actor: "{data[0]?.Tracks?.Actor}"</Text>
          <Text>Track Arranger: "{data[0]?.Tracks?.Arranger}"</Text>
        </View>
      )}
    />
  </View>
  );
};

export default TrackScreen;

const styles = StyleSheet.create({});
