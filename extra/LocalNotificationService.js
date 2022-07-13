import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { Platform } from 'react-native';


class LocalNotificationServices {

    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[LocalNotificationService] onRegister: ", token);
            },
            onNotification: function (notification) {
                console.log("[LocalNotificationService] onNotification", notification);
                if (!notification?.data) {
                    return
                }
                notification.userInteraction = true;
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data)

                // (required) Called when a remote is received or opened, or local notification is opened
                if (Platform.OS === 'ios') {
                    notification.finish(PushNotification.FetchResult.NoData)
                }
            },

            //IOS ONLY (optional): default: all - Permission to register
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
            requestPermissions: true,
        })
    }

    unregister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, option = {}) => {
        PushNotification.localNotification({
            /* Android Properties */
            ...this.buildAndroidNotification(id, title, message, data, option),
            /* IOS and Android Properties */
            ...this.buildIOSNotification(id, title, message, data, option),
            /* IOS and Android Properties */
            title: title || "",
            message: message || "" ,
            playSound: option.playSound || false,
            soundName: option.soundName || 'default',
            userInteraction: false // BOOLEAN: If the notification open by the user from the notification

        })
    }

    buildAndroidNotification = (id, title, message, data={}, option={}) => {
        return{
            id: id,
            autoCancel: true,
            largeIcon: option.largeIcon || "ic_launcher",
            smallIcon: option.smallIcon || "ic_notification",
            bigText: message || '',
            subText: title || '',
            vibration: option.vibration || 300,
            vibrate: option.vibrate || true,
            priority: option.priority || 'high',
            importance: option.importance || "high", //(option) set notification importance 
            data: data, 
        }
    }

    buildIOSNotification = (id, title, message, data={}, option={}) => {
        return{
            alertAction: option.alertAction || 'view',
            category: option.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    cancelAllLocalNotification = () => {
        if(Platform.OS === "ios"){
            PushNotificationIOS.removeAllDeliveredNotification();
        }else{
            PushNotificationIOS.cancelAllLocalNotification();
        }
    }

    removeDeliveredNotificationByID = (notificationID) => {
        console.log("[LocalNotificationServices]  removeDeliveredNotificationByID: ", notificationId);
        PushNotification.cancelLocalNotification({id: `${notificationID}`})
    }

}

export const LocalNotificationService = new LocalNotificationServices()