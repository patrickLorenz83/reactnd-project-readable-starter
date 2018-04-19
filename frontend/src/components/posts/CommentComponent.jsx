import React, { Component }           from 'react'
import PropTypes                      from 'prop-types'
import Modal                          from 'react-modal'
import CreateOrUpdateCommentComponent from './CreateOrUpdateCommentComponent'
import VoteComponent                  from '../VoteComponent'
import dateFormat                     from 'dateformat'

class CommentComponent extends Component {

    state = {
        modalCreateOpen: false
    }

    /**
     * @description Closing the comment update modal dialog and calling the action to submitting the data to backend.
     * @param comment, new comment data
     */
    updateComment = (comment) => {
        this.setState({ modalOpen: false })
        this.props.updateComment(comment)
    }

    render() {
        const { comment, deleteComment, postId, voteUp, voteDown } = this.props

        const commentKey = comment.id ? comment.id : Date.now()

        return (
            <div key={ commentKey }
                 className='postList'>
                <p>author: { comment.author }</p>
                <p>body: { comment.body }</p>
                <p>timestamp: { dateFormat(new Date(comment.timestamp), 'yyyy-mm-dd HH:MM') }</p>
                <p>voteScore: { comment.voteScore }</p>
                <button onClick={ () => deleteComment(comment.id, postId) }>Delete</button>
                <button onClick={ () => this.setState({ modalOpen: true, comment }) }>Update</button>

                <Modal
                    isOpen={ this.state.modalOpen }
                    ariaHideApp={ false }
                    contentLabel='update post'
                    onRequestClose={ () => this.setState({ modalOpen: false }) }
                >
                    <CreateOrUpdateCommentComponent
                        comment={ this.state.comment }
                        postId={ postId }
                        onComplete={ (comment) => this.updateComment(comment) }/>
                </Modal>
                <VoteComponent voteUp={ voteUp }
                               voteDown={ voteDown }/>
            </div>
        )
    }
}

CommentComponent.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    updateComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired
}

export default CommentComponent