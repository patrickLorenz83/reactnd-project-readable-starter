import * as CategoryAPI from '../api/CategoryAPI'
import * as PostsApi    from '../api/PostsAPI'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER'
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY'


export const fetchAllCategories = () => dispatch => (
    CategoryAPI.getAll().then(categories => (dispatch(receiveCategories(categories))))
)

export const fetchAllPosts = () => dispatch => (
    PostsApi.getAll().then(posts => dispatch(receivePosts(posts)))
)


export const createPost = (post) => dispatch => (
    PostsApi.createPost({
        ...post,
        id: `${post.author}_${Date.now()}`,
        timestamp: Date.now()
    }).then(fetchAllPosts())
)

export const changeSortOrder = (sortOrder) => ({
    type: CHANGE_SORT_ORDER,
    sortOrder
})

export const changeSortBy = (sortBy) => ({
    type: CHANGE_SORT_BY,
    sortBy
})

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

export const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
})