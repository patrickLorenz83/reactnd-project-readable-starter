import React, { Component } from 'react'
import * as Actions         from '../../actions'
import { connect }          from 'react-redux'
import PostComponent        from '../posts/PostComponent'

class PostView extends Component {

    componentDidMount() {
        console.log(('mount post view'), this.props)
        const { fetchingPost, match } = this.props
        fetchingPost(match.params.postId)
    }

    render() {
        const { post } = this.props
        return (
            <div>
                <button onClick={() => this.props.history.goBack()}
                      key='back'>back</button>
                <PostComponent post={post} full={true}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    post: state.post.data
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
    fetchingPost: (id) => dispatch(Actions.fetchPost(id)),
    createPost: (post) => dispatch(Actions.createPost(post)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
