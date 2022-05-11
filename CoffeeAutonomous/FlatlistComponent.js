import { 
  StyleSheet,
  Text, 
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image
 } from 'react-native'
import React, {useState, useEffect} from 'react'

const FlatlistComponent = () => {

const [isLoading, setisLoading] = useState(true);
const [data, setdata] = useState([]);
const [currentIndex, setcurrentIndex] = useState();
const [refFaltList, setrefFaltList] = useState();

useEffect(() => {
  getPhotoList();
},[])

getPhotoList = () => {
  const apiURL = 'https://jsonplaceholder.typicode.com/photos?_limit=20&_page=1';
  fetch(apiURL)
  .then((res) => res.json())
  .then((resJson) => {
    setdata(resJson);
  }).catch((error) => {
    console.log('Error:',error)
  }).finally(() => setisLoading(false));
}

onClickItem = (item, index) => {
  setcurrentIndex(index)
  const newArrData = data.map((e, index) => {
    if(item.id == e.id) {
      return {
        ...e,
        selected: true
      }
    }
    return {
      ...e,
      selected: false
    }
  })
  setdata(newArrData);
}

renderItem = ({item, index}) => {
  return(
    <TouchableOpacity
    onPress={() => onClickItem(item,index)}
      style={[
        styles.item,
        {
         // marginTop: 11,
          marginLeft: 14,
          width: 200,
          height: 150,
          backgroundColor: item.selected ? 'orange' : 'white',
          resizedMode: 'contain'
        }
      ]}
    >
      <Image style={styles.image}
          source={{uri: item.url}}      
      />

    </TouchableOpacity>
  )
}

onScrollToItemSelected = () => {
  refFaltList.scrollToIndex({animated: true, index: currentIndex});
}

getItemLayout = (data, index) => {
  return {length: 214, offset: 214 * index, index}
}

  return (
    <SafeAreaView style={styles.container}>

      {isLoading ? <ActivityIndicator/> : (
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `key-${item.id}`}
        getItemLayout={getItemLayout}
        horizontal
        ref={(ref) => setrefFaltList(ref)}
      />
      )}
      <TouchableOpacity 
        onPress={onScrollToItemSelected}
        style={styles.wrapButton}
      >
        <Text style={styles.txtSize}>
          Scroll to the item selected
        </Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  )
}

export default FlatlistComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  wrapButton: {
    alignItems: 'center',
    marginBottom: 50,
    padding: 20,
    margin: 20,
    backgroundColor: 'orange'
  },
  txtSize: {
    fontSize: 20,
  },
  item: {
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100
  }
})