import * as Actions from '../actions'

const initState = {
    data: [],
}

const post = (state = initState, action) => {
    switch (action.type) {
        case Actions.RECEIVE_POST:
            return {
                ...state,
                data: action.post
            }
        default:
            return state
    }
}

export default post