// import { StyleSheet, Text, View, Button } from 'react-native';
// import React, {useEffect} from 'react';
// import {fcmService} from './Extra/FCMService';
// //import {localNotificationService} from './Extra/LocalNotificationService';

// const App = () => {

//   useEffect(() => {
//     fcmService.registerAppWithFCM()
//     fcmService.register(onRegister, onNotification, onOpenNotification)
//     //localNotificationService.configure(onOpenNotification)

//     function onRegister(token) {
//       console.log("[App] onNotification: ", token)
//     }

//     function onNotification(notify) {
//       console.log("[App] onNotification: ", notify)
//       const option = {
//         soundName: 'default',
//         playsound: true
//       }
//       // localNotificationService.showNotification(
//       //   0,
//       //   notify.title,
//       //   notify.body,
//       //   notify,
//       //   option
//       // ) 
//     }

//     function onOpenNotification(notify){
//       console.log("[App] onOpenNotification: ", notify)
//       alert("Open Notification: " + notify.body)
//     }

//     return () => {
//       console.log("[App] unRegister")
//       fcmService.unRegister()
//       //localNotificationService.unregister()
//     }

//   }, [])



//   return (
//     <View style={styles.container}>
//       <Text>React native firebase</Text>
//       <Button 
//         title='press me'
//         //onPress={() => localNotificationService.cancelAllNotifications()}
//       />
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })





import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import React, {useEffect} from 'react';
import {fcmService} from './Src/helper/FCMService';
import {DetailsDataProvider} from './Src/context/useDetailsData';
import Routes from './Src/Navigation/Routes';
//import {localNotificationService} from './Extra/LocalNotificationService';

const App = () => {

  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    //localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onNotification: ", token)
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const option = {
        soundName: 'default',
        playsound: true
      }
      // localNotificationService.showNotification(
      //   0,
      //   notify.title,
      //   notify.body,
      //   notify,
      //   option
      // ) 
    }

    function onOpenNotification(notify){
      console.log("[App] onOpenNotification: ", notify)
      alert("Open Notification: " + notify.body)
    }

    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      //localNotificationService.unregister()
    }

  }, [])


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
}

export default App

const styles = StyleSheet.create({})