// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   ActivityIndicator

// } from 'react-native';



// //get data from this url
// const movieURL = "https://reactnative.dev/movies.json";

// const App = () => {
// //managing state with 'useState'
//   const [isLoading, setLoading] = React.useState(true)
//   const [data, setData] = React.useState([]);
//   const [title, setTitle] = React.useState([]);
//   const [description, setDescription] = React.useState([]);

//   //fetch data
//   useEffect(() => {
//     fetch(movieURL)
//       .then((response) => response.json()) //get response, convert to json
//       .then((json) => {
//         setData(json.movies);
//         setTitle(json.title);
//         setDescription(json.description);
//       })
//       .catch((error) => alert(error)) //display errors
//       .finally(setLoading(false)); // change loading state
//   }, []);
//   return (

//     <SafeAreaView style={styles.container}>
//       {/* while fetching data show indicator, else show response */}
//       {isLoading ? (
//         <ActivityIndicator />
//       ) : (
//         <View style={{ borderBottomWidth : 1, marginBottom: 12}}>
//           {/* title from url */}
//           <Text>{title}</Text>
//           {/* description from url */}
//           <Text>{description}</Text>
//           {/* Display each movies */}
//         <FlatList
//           data={data}
//           keyExtractor={({ id }, index) => id}
//           renderItem={({ item }) => (

//             <Text>
//               {item.title},
//               {item.releaseYear}
//             </Text>

//           )}
//         />
//         </View>
//       )}

//     </SafeAreaView>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: 'center',
//     justifyContent: 'center',
    
//   },
// })

// export default App;

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, SafeAreaView } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
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
    <SafeAreaView style={{ flex: 1, padding: 50, backgroundColor: "red" }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )}
    </SafeAreaView>
  );
};