import * as Actions from '../actions'

const initState = {
    data: {},
    comments: []
}

const post = (state = initState, action) => {
    switch (action.type) {
        case Actions.RECEIVE_POST:
            return {
                ...state,
                data: action.post
            }
        case Actions.RECEIVE_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        default:
            return state
    }
}

export default post