import * as Actions from '../actions'

const categories = (state = { data: [] }, action) => {
    switch (action.type) {
        case Actions.RECEIVE_CATEGORIES:
            return {
                ...state,
                data: action.categories
            }
        default:
            return state
    }
}

export default categories