import React, { Component } from 'react'
import * as Actions         from '../../actions'
import { connect }          from 'react-redux'
import CategoryList         from '../categories/CategoryList'
import PostList             from '../posts/PostList'
import CreatePost           from '../posts/CreatePost'
import Modal                from 'react-modal'
import sortByFunc           from 'sort-by'

class MainView extends Component {

    state = {
        createPostOpen: false
    }

    componentDidMount() {
        const { fetchingCategories, fetchingPosts } = this.props
        fetchingCategories()
        fetchingPosts()
    }

    componentWillReceiveProps(nextProps) {
        if ( this.props.sortOrder !== nextProps.sortOrder || this.props.sortBy !== nextProps.sortBy ) {
            this.sortingPosts(nextProps)
        }
    }

    /**
     * @description Sorting the given props by the order and direction from the props
     * @param props, must contain the direction and and order element and also the posts
     */
    sortingPosts = (props) => {
        const { sortBy, sortOrder } = props
        props.posts.sort(sortByFunc(`${sortOrder === 'desc' ? '-' : ''}${sortBy}`))
    }

    render() {
        const { categories, posts, createPost, sortOrder, sortBy, changeSortOrder, changeSortBy } = this.props
        this.sortingPosts(this.props)
        return (
            <div>
                <CategoryList categories={ categories }
                              label='Categories'/>
                <select name={ sortOrder }
                        onChange={ event => changeSortOrder(event.target.value) }
                        value={ sortOrder }>
                    <option value='asc'>asc</option>
                    <option value='desc'>desc</option>
                </select>
                <select name={ sortBy }
                        onChange={ event => changeSortBy(event.target.value) }
                        value={ sortBy }>
                    <option value='voteScore'>vote</option>
                    <option value='timestamp'>time</option>
                </select>
                <PostList posts={ posts }/>
                <button onClick={ () => this.setState({ createPostOpen: true }) }>create post</button>
                <Modal
                    isOpen={ this.state.createPostOpen }
                    contentLabel='create mew Post'
                    onRequestClose={ () => this.setState({ createPostOpen: false }) }
                >
                    <CreatePost categories={ categories }
                                createPost={ createPost }/>
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
    fetchingCategories: () => dispatch(Actions.fetchAllCategories()),
    fetchingPosts: () => dispatch(Actions.fetchAllPosts()),
    createPost: (post) => dispatch(Actions.createPost(post)),
    changeSortOrder: (sortOrder) => dispatch(Actions.changeSortOrder(sortOrder)),
    changeSortBy: (sortBy) => dispatch(Actions.changeSortBy(sortBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
