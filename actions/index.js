import * as API from '../utils/api'
export const actions = {
    populateDesks: 'populateDesks',
    storeDesk: 'storeDesk',
    deleteDesk: 'deleteDesk',
    createCard: 'createCard'
}

const populateDesks = (desks) => ({
    type: actions.populateDesks,
    desks
}) 

const storeDesk = (desk) => ({
    type: actions.storeDesk,
    desk
})

const deleteDeskInStore = (title) => ({
    type: actions.deleteDesk,
    title
})

const createCardInStore = (card, title) => ({
    type: actions.createCard,
    title,
    card
})

export const getDesks = () => (dispatch) => {
    API.getData()
    .then((result) => {
        dispatch(populateDesks(result))
    })
}

export const createDesk = (desk) => (dispatch) => {
    dispatch(storeDesk(desk))
    API.saveDesk(desk)
}

export const deleteDesk = (title) => (dispatch) => {
    dispatch(deleteDeskInStore(title))
    API.removeDesk(title)
}

export const createNewCard = ({card, title}) => (dispatch) => {
    dispatch(createCardInStore(card, title))
    API.createCard(title, card)
}