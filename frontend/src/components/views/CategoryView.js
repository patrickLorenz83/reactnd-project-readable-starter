import React, { Component }        from 'react'
import * as Actions                from '../../actions'
import { connect }                 from 'react-redux'
import CategoryList                from '../categories/CategoryList'
import PostList                    from '../posts/PostList'
import sortByFunc                  from 'sort-by'
import { SORT_ORDER_DESC as desc } from '../../utils/sorting'
import SortComponent               from '../Sort/SortComponent'
import { Link }                    from 'react-router-dom'

class CategoryView extends Component {

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


    render() {
        const { categories, posts, match  } = this.props
        this.sortingPosts(this.props)
        return (
            <div>
                <CategoryList categories={ categories }
                              label='Categories'/>
                <Link to='/' key='overview'>Overview</Link>
                <SortComponent/>
                <PostList posts={ posts.filter(post => post.category === match.params.category) }/>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)
