import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import useDetailsData from '../context/useDetailsData';
import moment from 'moment-timezone';

const ReleaseScreen = () => {
  const { data, setData } = useDetailsData();


  return(
    <View style={{ margin: 15 }}>
    <Text>ReleaseScreen "{data[0]?.Release?.Release_Id}"</Text>
    <Text>Release PrimaryArtist "{data[0]?.Release?.Release_PrimaryArtist}"</Text>
    <Text>Release DisplayArtist "{data[0]?.Release?.Release_DisplayArtist}"</Text>
    <Text>Release ReleaseTitle "{data[0]?.Release?.Release_ReleaseTitle}"</Text>
    <Text>Release Label "{data[0]?.Release?.Release_Label}"</Text>
    <Text>Release MainGenre "{data[0]?.Release?.Release_MainGenre}"</Text>
    <Text>Release SubGenre "{data[0]?.Release?.Release_SubGenre}"</Text>
    <Text>Release Date "{moment(new Date(data[0]?.Release?.Date)).format('DD-MM-YYYY')}"</Text>
    <Text>Release ReleaseType "{data[0]?.Release?.Release_ReleaseType}"</Text>
    <Text>Composer "{data[0]?.Release?.Composer}"</Text>
    <Text>Release Orchestra "{data[0]?.Release?.Orchestra}"</Text>
    <Text>Release Arranger "{data[0]?.Release?.Arranger}"</Text>
    <Text>Release Actor "{data[0]?.Release?.Actor}"</Text>
    <Text>Release Lyricist "{data[0]?.Release?.Lyricist}"</Text>
    <Text>Release Checked "{data[0]?.Release?.Checked}"</Text>
    <Text>Release LanguageCode "{data[0]?.Release?.LanguageCode}"</Text>
  </View>
  )


}

export default ReleaseScreen

const styles = StyleSheet.create({})



// return (
//   <View>
//     <FlatList
//       data={data}
//       renderItem={() => (
//         <View style={{ margin: 15 }}>
//           <Text>ReleaseScreen "{data[0]?.Release?.Release_Id}"</Text>
//           <Text>Release PrimaryArtist "{data[0]?.Release?.Release_PrimaryArtist}"</Text>
//           <Text>Release DisplayArtist "{data[0]?.Release?.Release_DisplayArtist}"</Text>
//           <Text>Release ReleaseTitle "{data[0]?.Release?.Release_ReleaseTitle}"</Text>
//           <Text>Release Label "{data[0]?.Release?.Release_Label}"</Text>
//           <Text>Release MainGenre "{data[0]?.Release?.Release_MainGenre}"</Text>
//           <Text>Release SubGenre "{data[0]?.Release?.Release_SubGenre}"</Text>
//           <Text>Release Date "{moment(new Date(data[0]?.Release?.Date)).format('DD-MM-YYYY')}"</Text>
//           <Text>Release ReleaseType "{data[0]?.Release?.Release_ReleaseType}"</Text>
//           <Text>Composer "{data[0]?.Release?.Composer}"</Text>
//           <Text>Release Orchestra "{data[0]?.Release?.Orchestra}"</Text>
//           <Text>Release Arranger "{data[0]?.Release?.Arranger}"</Text>
//           <Text>Release Actor "{data[0]?.Release?.Actor}"</Text>
//           <Text>Release Lyricist "{data[0]?.Release?.Lyricist}"</Text>
//           <Text>Release Checked "{data[0]?.Release?.Checked}"</Text>
//           <Text>Release LanguageCode "{data[0]?.Release?.LanguageCode}"</Text>
//         </View>
//       )}
//     />
//   </View>
// )
