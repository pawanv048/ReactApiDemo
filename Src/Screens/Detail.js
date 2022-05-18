import {PrivateValueStore} from '@react-navigation/native';
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
} from 'react-native';

export default App = ({route}) => {
  const detailsData = route.params.data;
  //console.log(route.params.data)
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState(
    'Release Id: ' + detailsData.Release_Id + '\n Status: true, \ncomment: ',
  );
  const [txt, setTxt] = useState('Release Id: ' + detailsData.Release_Id);

  const [headline, setHeadline] = useState('');

  //Get Data
  const getRelease = async () => {
    try {
      const resp = await fetch(
        `http://84.16.239.66/api/Release/GetReleasesDetails?ReleaseId=${detailsData?.Release_Id}`,
      );

      //console.log('ReleaseId=', detailsData?.Release_Id);

      const json = await resp.json();
      setData(json.Data);
      //console.log('fetchDetailsUsingReleaseId=', JSON.stringify(json.Data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRelease();
    // postUser();
  }, []);

  //http://84.16.239.66/api/ReleaseUpdate/PublishRelease
  const postUser = (status, comment) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        ReleaseId: detailsData?.Release_Id,
        Status: status,
        Comment: `${comment}`,
      },
    };

    fetch(
      'http://84.16.239.66/api/ReleaseUpdate/PublishRelease',
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        console.log('Fetch API Response', json);
        Alert.alert(
          'Release Id: ' +
            detailsData.Release_Id +
            `\n status : ${status}` +
            '\n' + 'comment : '+
            comment,
          [{t: 'ok', onPress: () => console.log('ok pressed')}],
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  {
    /*Release header*/
  }

  const ListHeader = () => {
    function showAlert() {
      Alert.alert(
        'Release Id: ' +
          detailsData.Release_Id +
          '\n status : false' +
          '\n' +
          headline,
        [{t: 'ok', onPress: () => console.log('ok pressed')}],
      );
    }

    //View to set in Header
    return (
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

            {/* Modal with TextInput create issue while changeing the text init */}
            {/* <Modal
              animationType={'slide'}
              transparent={true}
              visible={showModal}
              //onRequestClose={() => showModal(false)}
            >
              <View style={{alignItems: 'center', top: 300}}>
                <View style={styles.modalView}>
                  <TextInput
                    value={headline}
                    style={styles.input}
                    placeholder="Enter comment"
                    onChangeText={t => setHeadline(t)}
                  />
                  <TouchableOpacity
                    style={{backgroundColor: 'blue', left: 80, top: 47}}
                    // onPress={showAlert}
                    onPress={() => postUser(false, headline)}>
                    <Text style={{color: 'white', padding: 15}}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{backgroundColor: 'blue'}}
                    onPress={() => {
                      setShowModal(!showModal);
                    }}>
                    <Text style={{color: 'white', padding: 15}}>Dismiss</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal> */}

            <ModalFunction
              showModal={showModal}
              setShowModal={setShowModal}
              headline={headline}
              setHeadline={setHeadline}
              onPress={(s, c) => postUser(s, c)}
            />

            <TouchableOpacity
              style={styles.accept}
              // onPress={getDataUsingPost}
              //onPress={() => getDataUsingPost(true, '')}
              onPress={() => Alert.alert(text)}
              //onPress={(s) => postUser(s)}
              >
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
            <Text style={{fontSize: 18}}>
              Release_PrimaryArtist: {route.params.data.Release_PrimaryArtist}
            </Text>
            <Text style={{fontSize: 18}}>
              Release_Label: {route.params.data.Release_Label}
            </Text>
            <Text style={{fontSize: 18}}>
              Release_PrimaryArtist: {route.params.data.Release_PrimaryArtist}
            </Text>
          </View>
        </View>
      </React.Fragment>
    );
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
          ListHeaderComponent={ListHeader}
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
    width: '70%',
    borderWidth: 1,
    textAlign: 'left',
    paddingLeft: 10,
    borderRadius: 5,
  },
});

const ModalFunction = ({
  showModal,
  setShowModal,
  // headline,
  // setHeadline,
  onPress,
}) => {
  const [headline, setHeadline] = useState('');
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={showModal}
      //onRequestClose={() => showModal(false)}
    >
      <View style={{alignItems: 'center', top: 300}}>
        <View style={styles.modalView}>
          <TextInput
            //value={headline}
            style={styles.input}
            placeholder="Enter comment"
            onChangeText={t => setHeadline(t)}
          />

          <TouchableOpacity
            style={{backgroundColor: 'blue', left: 80, top: 47}}
            // onPress={showAlert}
            onPress={() => onPress(false, headline)}>
            <Text style={{color: 'white', padding: 15}}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{backgroundColor: 'blue'}}
            onPress={() => {
              setShowModal(!showModal);
            }}>
            <Text style={{color: 'white', padding: 15}}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};