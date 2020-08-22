import { AsyncStorage, Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const UDACITY_FLASHCARDS = 'Udacity:flashcards'
const UDACITY_FLASHCARDS_NOTIFICATION = 'Udacity:flashcards_notification'

export const getDummyData = () => {
    const data = {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
    }
    AsyncStorage.setItem(UDACITY_FLASHCARDS, JSON.stringify(data))
    return data
}

export const clearNotification = () => {
  return AsyncStorage.removeItem(UDACITY_FLASHCARDS_NOTIFICATION)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export const setNotification = () => {
  return AsyncStorage.getItem(UDACITY_FLASHCARDS_NOTIFICATION)
    .then(JSON.parse)
    .then( result => {
      if(result ===  null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            console.log('Status', status)
            if(status === 'granted') {
              var tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleNotificationAsync({
                content: createNotification(),
                trigger: Platform.OS === 'ios' 
                  ? {
                    repeat: 'day',
                    time: tomorrow
                  } : {
                    hour: 20,
                    minute: 0,
                    repeats: true
                  }
              }).then((identifier) => console.log(identifier))

              AsyncStorage.setItem(UDACITY_FLASHCARDS_NOTIFICATION, JSON.stringify(true))
            }
          })
      }
    })
}

const createNotification = () => ({
  title: 'Start your quiz!',
  body: 'Your have not taken a quiz today !'
})
