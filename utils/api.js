import { AsyncStorage } from 'react-native'
import { getDummyData } from './helper'

const UDACITY_FLASHCARDS = 'Udacity:flashcards'

export const getData = () => {
    return AsyncStorage.getItem(UDACITY_FLASHCARDS)
        .then( result => result? JSON.parse(result) : getDummyData())
        
}

export const saveDesk = (desk) => {
    return AsyncStorage.mergeItem(UDACITY_FLASHCARDS, JSON.stringify(desk))
}

export const removeDesk = (title) => {
    return AsyncStorage.getItem(UDACITY_FLASHCARDS)
        .then(JSON.parse)
        .then( desks => {
            delete desks[title]
            AsyncStorage.setItem(UDACITY_FLASHCARDS, JSON.stringify(desks))
        })
}

export const createCard = (title, card) => {
    return AsyncStorage.getItem(UDACITY_FLASHCARDS)
        .then(JSON.parse)
        .then( desks => {
            desks[title].questions.push(card)
            AsyncStorage.setItem(UDACITY_FLASHCARDS, JSON.stringify(desks))
        })
}