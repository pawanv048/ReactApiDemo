import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
        getFcmToken()
  }

}

const getFcmToken = async () => {

let checkToken = await AsyncStorage.getItem('fcmToken')
    console.log('the old token', checkToken)
    try {
      if(!checkToken){
        const fcmToken = await messaging().getToken()
        if(!!fcmToken){
          console.log("fcmToken generated", fcmToken)
          await AsyncStorage.setItem('fcmToken', fcmToken)
        }
        
      }
       
    } catch (error) {
        console.log("fcm Token error", error)
        alert(error?.message)
    }
}