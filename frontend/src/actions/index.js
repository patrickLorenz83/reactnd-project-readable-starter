import * as CategoryAPI from '../api/CategoryAPI'
import * as PostsApi    from '../api/PostsAPI'
import * as CommentsApi from '../api/CommentsAPI'
import uuid             from 'uuid/v4'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER'
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY'

export const fetchAllCategories = () => dispatch => (
    CategoryAPI.getAll().then(categories => (dispatch(receiveCategories(categories))))
)

export const fetchAllPosts = () => dispatch => (
    PostsApi.getAll().then(posts => dispatch(receivePosts(posts)))
)

export const fetchPost = (id) => dispatch => (
    PostsApi.getPost(id).then(post => dispatch(receivePost(post)))
)

export const fetchComments = (id) => dispatch => (
    CommentsApi.getAllForPost(id).then(comments => dispatch(receiveComments(comments)))
)

export const createPost = (post) => dispatch => (
    PostsApi.createPost({
        ...post,
        id: uuid(),
        timestamp: Date.now()
    }).then(dispatch(fetchAllPosts()))
)

export const createComment = (comment) => dispatch => (
    CommentsApi.createComment({
        ...comment,
        id: uuid(),
        timestamp: Date.now()
    })
        .then(dispatch(fetchComments(comment.parentId)))
        .then(dispatch(fetchPost(comment.parentId)))

)

export const voteUpComment = (id,postId) => dispatch => (
    CommentsApi.voteUp(id)
        .then(dispatch(fetchComments(postId)))
)
export const voteDownComment = (id,postId) => dispatch => (
    CommentsApi.voteDown(id)
        .then(dispatch(fetchComments(postId)))
)
export const voteUpPost = (id) => dispatch => (
    PostsApi.voteUp(id)
        .then(dispatch(fetchAllPosts()))
        .then(dispatch(fetchPost(id)))
)
export const voteDownPost = (id) => dispatch => (
    PostsApi.voteDown(id)
        .then(dispatch(fetchAllPosts()))
        .then(dispatch(fetchPost(id)))
)
export const updateComment = (comment) => dispatch => (
    CommentsApi.updateComment(comment)
        .then(dispatch(fetchComments(comment.parentId)))
        .then(dispatch(fetchPost(comment.parentId)))
)

export const deleteComment = (commentId, postId) => dispatch => (
    CommentsApi.deleteComment(commentId)
        .then(dispatch(fetchComments(postId)))
        .then(dispatch(fetchPost(postId)))
)

export const deletePost = (postId) => dispatch => (
    PostsApi.deletePost(postId)
        .then(console.log('delete done'))
        .then(dispatch(fetchAllPosts()))
        .then(dispatch(fetchPost(postId)))
)

export const updatePost = (id, post) => dispatch => (
    PostsApi.updatePost(id, post)
        .then(dispatch(fetchAllPosts()))
        .then(dispatch(fetchPost(id)))
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

export const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
})

export const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
})

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})