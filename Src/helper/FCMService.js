import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMServices {

    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessage();
            await messaging().setAutoInitEnable(true);
        }

    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has Permission
                    this.getToken(onRegister)
                } else {
                    // User don't have permission
                    this.requestPermission(onRegister)
                }
            }).catch(error => {
                console.log("[FCMService] Permission Rejected", error)
            })
    }


    getToken = (onRegister) => {
        messaging().getToken()
        .then(fcmToken => {
            if (fcmToken) {
                onRegister(fcmToken)
            }else {
                console.log("[FCMService] User does not have a device ")
            }
        }).catch(error => {
            console.log("[FCMService] getToken rejected ", error)
        })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
        .then(() => {
            this.getToken(onRegister)
        }).catch(error => {
            console.log("[FCMService] getToken rejected ", error)
        })
    }

    deleteToken = () => {
        
        console.log("[FCMServices] deleteToken")
        messaging().deleteToken()
        .catch(error => {
            console.log("[FCMService] Delete token error" , error)
        })
    }



    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        // When the application is running on the background

        messaging()
        .onNotificationOpenedApp( remoteMessage => {
            console.log("[FCMServices] onNotificationOpenedApp Notification caused app to open")
            if (remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        });

        // when the application opened from quit state

        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            console.log('[FCMService] getInitialNotification Notification caused app to open')

            if (remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)

            }
        });

        // Foreground state message

        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCMService] A new FCM message arrived!", remoteMessage) 

            if (remoteMessage) {
                let notification = null
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data.notification
                }else {
                    notification = remoteMessage.notification
                }
                onNotification(notification)
            }
        });

        // Triggered when have new token
        
        messaging().onTokenRefresh( fcmToken => {
            console.log("[FCMService] New Token refresh: ", fcmToken)
            onRegister(fcmToken)
        })

    }

    unRegister = () => {
        this.messageListener()
    }
}

export const fcmService =  new FCMServices()