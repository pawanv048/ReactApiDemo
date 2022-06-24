import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
//library to format date
import {format} from 'date-fns';
import API from '../apis/API';

const CoffeeAutonomous = ({navigation, route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // const getMovies = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://84.16.239.66/api/Release/GetAllReleases',
  //     );
  //     const json = await response.json();
  //     setData(json.Data); //set data
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getMovies2 = () => {
    // try {
    //   const response = await fetch('');
    //   const json = await response.json();
    //   setData(json.Data);  //set data
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    // }
    API({
      url: 'http://84.16.239.66/api/Release/GetAllReleases',
      onSuccess: val => {
        setData(val?.Data)
      },
      onError: val => console.log('ERROR:', val),
    });
    setLoading(false);
  };

  useEffect(() => {
    // getMovies();
    getMovies2();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, padding: Platform.OS === 'ios' ? 40 : 2}}>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          style={{flex: 1, margin: 10, marginHorizontal: 20}}
          keyExtractor={({Release_Id}) => Release_Id}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                padding: 24,
                backgroundColor: '#1B1A17',
                marginBottom: 10,
                borderRadius: 15,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', {data: item})}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Roboto-Italic',
                  }}>
                  Release Title : {item.Release_ReleaseTitle}
                  {'\n'}
                  {'\n'}
                  Release Artist : {item.Release_PrimaryArtist}
                  {'\n'}
                  {'\n'}
                  Release Date : {format(new Date(item.Date), 'dd-MM-yyyy')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default CoffeeAutonomous;
