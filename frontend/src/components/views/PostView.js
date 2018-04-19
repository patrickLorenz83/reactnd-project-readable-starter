import React, { Component }           from 'react'
import * as Actions                   from '../../actions'
import { connect }                    from 'react-redux'
import PostComponent                  from '../posts/PostComponent'
import CommentComponent               from '../posts/CommentComponent'
import CreateOrUpdateCommentComponent from '../posts/CreateOrUpdateCommentComponent'
import Modal                          from 'react-modal'

class PostView extends Component {

    state = {
        modalOpen: false
    }

    componentDidMount() {
        const { fetchingPost, match, fetchingCategories, fetchingComments } = this.props
        fetchingPost(match.params.postId)
        fetchingCategories()
        fetchingComments(match.params.postId)
    }

    /**
     * @description Closing the comment create modal dialog and calling the action to submitting the data to backend.
     * @param comment, new comment data
     */
    createComment = (comment) => {
        this.setState({ modalOpen: false })
        this.props.createComment({ ...comment, parentId: this.props.match.params.postId })
    }

    render() {
        const {
            post, categories, updatePost, comments, updateComment, deleteComment, deletePost, voteUp, voteDown,
            voteUpComment, voteDownComment
        } = this.props
        return (
            <div>
                <button onClick={ () => this.props.history.goBack() }
                        key='back'>back
                </button>
                <PostComponent post={ post }
                               full={ true }
                               categories={ categories }
                               deletePost={ deletePost }
                               updatePost={ updateData => updatePost(post.id, updateData) }
                               voteUp={ () => voteUp(post.id) }
                               voteDown={ () => voteDown(post.id) }
                />
                { comments && comments.length > 0 &&
                <div>
                    Comments:
                    { comments.map(element => <CommentComponent comment={ element }
                                                                key={ `${element.id}-comment` }
                                                                postId={ post.id }
                                                                deleteComment={ deleteComment }
                                                                updateComment={ updateComment }
                                                                voteUp={ () => voteUpComment(element.id, post.id) }
                                                                voteDown={ () => voteDownComment(element.id, post.id) }
                    />) }
                </div>
                }
                <button onClick={ () => this.setState({ modalOpen: true }) }>Create Comment</button>
                <Modal
                    isOpen={ this.state.modalOpen }
                    contentLabel='update post'
                    ariaHideApp={ false }
                    onRequestClose={ () => this.setState({ modalOpen: false }) }
                >
                    <CreateOrUpdateCommentComponent
                        comment={ {} }
                        postId={ '' }
                        onComplete={ (comment) => this.createComment(comment) }/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.data,
    post: state.post.data,
    comments: state.post.comments
})

const mapDispatchToProps = (dispatch) => ({
    /**
     * @description Fetching all categories from the backend and adding them to the redux store
     * @returns {*}
     */
    fetchingCategories: () => dispatch(Actions.fetchAllCategories()),
    /**
     * @description Fetching the post for id from the backend and adding them to the redux store
     * @returns {*}
     */
    fetchingPost: (id) => dispatch(Actions.fetchPost(id)),
    fetchingComments: (id) => dispatch(Actions.fetchComments(id)),
    updatePost: (id, post) => dispatch(Actions.updatePost(id, post)),
    updateComment: (comment) => dispatch(Actions.updateComment(comment)),
    createComment: (comment) => dispatch(Actions.createComment(comment)),
    deleteComment: (commentId, postId) => dispatch(Actions.deleteComment(commentId, postId)),
    deletePost: (postId) => dispatch(Actions.deletePost(postId)),
    voteUp: (postId) => dispatch(Actions.voteUpPost(postId)),
    voteDown: (postId) => dispatch(Actions.voteDownPost(postId)),
    voteUpComment: (commentId, postId) => dispatch(Actions.voteUpComment(commentId, postId)),
    voteDownComment: (commentId, postId) => dispatch(Actions.voteDownComment(commentId, postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
