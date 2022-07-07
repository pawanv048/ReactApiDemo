import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import Routes from './Src/Navigation/Routes';
import {DetailsDataProvider} from './Src/context/useDetailsData';
import { requestUserPermission } from './Src/helper/notificationServices';

const App = () => {


  useEffect(() => {
    requestUserPermission()
  },[])

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Curd/> */}
      <DetailsDataProvider>
        <Routes />
      </DetailsDataProvider>
      {/* <InputScreen/> */}
      {/* <Registration/> */}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});