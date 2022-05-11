
import React, { useEffect, useState } from 'react';
import { 
  ActivityIndicator,
  FlatList,
  Text,
  View,
  SafeAreaView, TouchableOpacity, Alert, Button } from 'react-native';
//library to format date
import { format } from "date-fns";


const CoffeeAutonomous = ({navigation, route}) => {
//console.log(route)
//console.log(navigation.params)
//console.log(route.params.text)

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://84.16.239.66/api/Release/GetAllReleases');
      const json = await response.json();
      setData(json.Data);  //set data 
      //console.log("show"+ JSON)
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
          keyExtractor={({ Release_Id }) => Release_Id}
          renderItem={({ item }) => (
            <View style={{
              flex: 1, padding: 24, backgroundColor: 'black', marginBottom: 10,
              borderRadius: 15
            }}
          >
            
              <TouchableOpacity  onPress={() => navigation.navigate('Detail', {data:item})}>
                <Text style={{ color: 'white', fontSize: 20 }}>
                Release Title : {item.Release_ReleaseTitle}
                  {"\n"}
                  {"\n"}
                Release Artist : {item.Release_PrimaryArtist}
                {"\n"}
                {"\n"}
                Release Date : {format(new Date(item.Date),"dd-MM-yyyy")}
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

