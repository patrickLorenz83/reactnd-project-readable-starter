import * as Actions      from '../actions'
import * as SortingUtils from '../utils/sorting'

const initState = {
    data: [],
    sortOrder: SortingUtils.SORT_ORDER_DESC,
    sortBy: SortingUtils.SORT_ORDER_VOTE
}

const posts = (state = initState, action) => {
    switch (action.type) {
        case Actions.RECEIVE_POSTS:
            return {
                ...state,
                data: action.posts
            }
        case Actions.CHANGE_SORT_ORDER:
            return {
                ...state,
                sortOrder: action.sortOrder
            }
        case Actions.CHANGE_SORT_BY:
            return {
                ...state,
                sortBy: action.sortBy
            }
        default:
            return state
    }
}

export default posts