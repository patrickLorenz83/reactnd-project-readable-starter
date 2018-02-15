import React, { Component }        from 'react'
import * as Actions                from '../../actions'
import { connect }                 from 'react-redux'
import CategoryList                from '../categories/CategoryList'
import PostList                    from '../posts/PostList'
import CreatePost                  from '../posts/CreatePost'
import Modal                       from 'react-modal'
import sortByFunc                  from 'sort-by'
import { SORT_ORDER_DESC as desc } from '../../utils/sorting'
import SortComponent               from '../SortComponent'

class MainView extends Component {

    state = {
        createPostOpen: false
    }

    componentDidMount() {
        const { fetchingCategories, fetchingPosts } = this.props
        fetchingCategories()
        fetchingPosts()
    }

    /**
     * @description Sorting the given props by the order and direction from the props
     * @param props, must contain the direction and and order element and also the posts
     */
    sortingPosts = ({ sortBy, sortOrder, posts }) => {
        posts.sort(sortByFunc(`${sortOrder === desc ? '-' : ''}${sortBy}`))
    }

    /**
     * @description Closing the post create modal dialog and calling the action to submitting the data to backend.
     * @param post, new post data
     */
    createOrUpdatePost = (post) => {
        this.setState({ createPostOpen: false })
        this.props.createPost(post)
    }

    render() {
        const { categories, posts, sortOrder, sortBy, changeSortOrder, changeSortBy } = this.props
        this.sortingPosts(this.props)
        return (
            <div>
                <CategoryList categories={ categories }
                              label='Categories'/>
                <SortComponent sortOrder={ sortOrder }
                               sortBy={ sortBy }
                               changeSortBy={ changeSortBy }
                               changeSortOrder={ changeSortOrder }/>
                <PostList posts={ posts }/>
                <button onClick={ () => this.setState({ createPostOpen: true }) }>create post</button>
                <Modal
                    isOpen={ this.state.createPostOpen }
                    contentLabel='create mew Post'
                    onRequestClose={ () => this.setState({ createPostOpen: false }) }
                >
                    <CreatePost categories={ categories }
                                createPost={ (post) => this.createOrUpdatePost(post) }/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.data,
    posts: state.posts.data,
    sortBy: state.posts.sortBy,
    sortOrder: state.posts.sortOrder
})

const mapDispatchToProps = (dispatch) => ({
    /**
     * @description Fetching all categories from the backend and adding them to the redux store
     * @returns {*}
     */
    fetchingCategories: () => dispatch(Actions.fetchAllCategories()),
    /**
     * @description Fetching all posts from the backend and adding them to the redux store
     * @returns {*}
     */
    fetchingPosts: () => dispatch(Actions.fetchAllPosts()),
    createPost: (post) => dispatch(Actions.createPost(post)),
    /**
     * @description Updating the sort order for posts in the store
     * @param sortOrder
     * @returns {*}
     */
    changeSortOrder:
        (sortOrder) => dispatch(Actions.changeSortOrder(sortOrder)),
    /**
     * @description Updating the sort element for posts in the store
     * @param sortBy
     * @returns {*}
     */
    changeSortBy:
        (sortBy) => dispatch(Actions.changeSortBy(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
