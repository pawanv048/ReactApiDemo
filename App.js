import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import Routes from './Src/Navigation/Routes';
import {DetailsDataProvider} from './Src/context/useDetailsData';

const App = () => {
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
