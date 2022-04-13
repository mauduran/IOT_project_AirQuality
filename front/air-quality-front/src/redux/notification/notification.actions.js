import NotificationActionTypes from './notification.types';

export const openSuccessNotificationStart = (message) => ({
    type: NotificationActionTypes.OPEN_SUCCESS_NOTIFICATION_START,
    payload: message,
});


export const openErrorNotificationStart = (message) => ({
    type: NotificationActionTypes.OPEN_ERROR_NOTIFICATION_START,
    payload: message,
})

export const openSuccessNotification = (message) => ({
    type: NotificationActionTypes.OPEN_SUCCESS_NOTIFICATION,
    payload: message,
});


export const openErrorNotification = (message) => ({
    type: NotificationActionTypes.OPEN_ERROR_NOTIFICATION,
    payload: message,
})

export const closeNotification = () => ({
    type: NotificationActionTypes.CLOSE_NOTIFICATION,
})

