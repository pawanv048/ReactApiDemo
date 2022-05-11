

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';



const CoffeeAutonomous = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://84.16.239.66/api/Release/GetAllReleases');
      const json = await response.json();
      setData(json.Data);  //set data 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);



  return (
    
      <SafeAreaView style={{ flex: 1, padding: 40 }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, margin: 24 }}
            //keyExtractor={({ Release_Id }) => Release_Id}
            renderItem={({ item }) => (
              <View style={{
                flex: 1, padding: 24, backgroundColor: 'black', marginBottom: 10,
                borderRadius: 15
              }}>
                <TouchableOpacity onPress={() => Alert.alert(item.Release_PrimaryArtist)}>
                  <Text style={{ color: 'white', fontSize: 20 }}>{item.Release_PrimaryArtist}, {item.Date}</Text>
                </TouchableOpacity>

              </View>

            )}
          />
        )}
      </SafeAreaView>

  );
};

export default CoffeeAutonomous;