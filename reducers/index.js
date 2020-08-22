import { actions } from '../actions'

export default function desks (state={}, action) {
    switch(action.type) {
        case actions.populateDesks:
            return {
                ...state,
                ...action.desks
            }
        case actions.storeDesk:
            return {
                ...state,
                ...action.desk
            }
        case actions.deleteDesk:
            const { [action.title]: old, ...newState } = state
            return {
                ...newState
            }
        case actions.createCard:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat([action.card])
                }
            }
        default:
            return state
    }
} 