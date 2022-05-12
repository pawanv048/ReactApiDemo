import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

export default App = ({navigation, route}) => {
  console.log(route);
  console.log('RouteDetailsData=', route.params.data);
  // const {Release_Id} = route.params;
  const detailsData = route.params.data;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');

  //http://84.16.239.66/api/Release/GetReleasesDetails?ReleaseId=77763- example
  //http://84.16.239.66/api/Release/GetReleasesDetails?ReleaseId=78305
  //http://84.16.239.66/api/Release/GetAllReleases

  //Get Data
  const getRelease = async () => {
    try {
      const resp = await fetch(
        `http://84.16.239.66/api/Release/GetReleasesDetails?ReleaseId=${detailsData?.Release_Id}`,
      );

      console.log('ReleaseId=', detailsData?.Release_Id);

      const json = await resp.json();
      setData(json.Data);
      console.log('fetchDetailsUsingReleaseId=', JSON.stringify(json.Data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // const query = new URLSearchParams(this.props.Release_Id);

    // const Release_Id = query.get('ID')
    // alert(Release_Id)
    //const queryParams = new URLSearchParams(window.location.search);
    //const id = queryParams.get('Id');
    //alert(id)
    getRelease();
    //getDataUsingPost();
  }, []);

  //Post data

  const getDataUsingPost = () => {
    //POST json

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
    };

    fetch(
      'http://84.16.239.66/api/ReleaseUpdate/PublishRelease?ReleaseId=77763&Status=true&Comment=',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => Alert.alert(result))
      .catch(error => console.log('error', error));
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        // Track Disk data

        <FlatList
          contentContainerStyle={{padding: 20}}
          ListHeaderComponent={() => (
            <React.Fragment>
              <View style={styles.releaseContainer}>
                <View>
                  <Image
                    source={require('../../assets/images/MusicTrack.jpeg')}
                    style={{
                      width: 150,
                      height: 150,
                      margin: 8,
                      marginBottom: 3,
                    }}
                  />
                  {/* User Feedback */}
                  <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={showModal}
                    on>
                    <View style={{alignItems: 'center', top: 300}}>
                      <View style={styles.modalView}>
                        <TextInput
                          style={styles.input}
                          placeholder="comment"
                          onChangeText={text => setText(text)}
                          //value={text}
                        />
                        <TouchableOpacity
                          style={{backgroundColor: 'blue', left: 80, top: 47}}
                          //onPress={() => getDataUsingPost(text)}
                          onPress={() => Alert.alert(text)}>
                          <Text style={{color: 'white', padding: 15}}>
                            Save
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{backgroundColor: 'blue'}}
                          onPress={() => {
                            setShowModal(!showModal);
                          }}>
                          <Text style={{color: 'white', padding: 15}}>
                            Dismiss
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>

                  <TouchableOpacity
                    style={styles.accept}
                    onPress={getDataUsingPost}>
                    <Text style={{color: 'white', fontSize: 16}}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.Reject}
                    onPress={() => setShowModal(!showModal)}>
                    <Text style={{color: 'white', fontSize: 19}}>Reject</Text>
                  </TouchableOpacity>
                </View>

                {/* Release Data */}

                <View style={{paddingLeft: 10, marginVertical: 10}}>
                  <Text style={{fontSize: 18}}>
                    Release Id: {route.params.data.Release_Id}
                  </Text>
                  {/* <Text style={{ fontSize: 18 }}>Release Release Title : {item.Release.Release_ReleaseTitle}</Text>
                    <Text style={{ fontSize: 18 }}>Release Label : {item.Release.Release_Label}</Text>
                    <Text style={{ fontSize: 18 }}>Release Artist : {item.Release.Release_PrimaryArtist}</Text> */}
                </View>
              </View>
            </React.Fragment>
          )}
          ListFooterComponent={<View style={{height: 20}}></View>}
          data={data}
          renderItem={({item}) => (
            <View>
              <View style={styles.trackContainer}>
                <Text>Track Disc : {item.Tracks.Track_Disc} </Text>
                <Text>Track Title : {item.Tracks.Track_Title} </Text>
                <Text>Track Artist : {item.Tracks.Track_Artist} </Text>
                <Text>Track MainGenre : {item.Tracks.Track_MainGenre} </Text>
              </View>
            </View>
          )}
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  releaseContainer: {
    backgroundColor: 'lightgrey',
  },
  trackContainer: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginTop: 20,
  },
  accept: {
    position: 'absolute',
    right: 50,
    top: 10,
    backgroundColor: 'blue',
    padding: 15,
  },
  Reject: {
    position: 'absolute',
    right: 50,
    top: 70,
    backgroundColor: 'blue',
    padding: 15,
    paddingLeft: 20,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    width: 300,
    height: 300,
    //marginLeft: 20
  },
  input: {
    height: 50,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
