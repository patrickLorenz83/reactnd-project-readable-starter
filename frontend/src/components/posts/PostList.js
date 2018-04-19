import React, { Component }        from 'react'
import PropTypes                   from 'prop-types'
import PostComponent               from './PostComponent'
import CreateOrUpdatePostComponent from './CreateOrUpdatePostComponent'
import Modal                       from 'react-modal'

class PostList extends Component {

    state = {
        createPostOpen: false
    }

    /**
     * @description Closing the post create modal dialog and calling the action to submitting the data to backend.
     * @param post, new post data
     */
    createPost = (post) => {
        this.setState({ createPostOpen: false })
        this.props.createPost(post)
    }

    render() {


        const { posts, categories, voteUp, voteDown } = this.props
        return (
            <div>
                Posts:
                { posts && posts.length > 0 && posts.map(post => (
                    <PostComponent post={ post }
                                   key={ `${post.id}-posts` }
                                   full={ false }
                                   voteUp={ () => voteUp(post.id) }
                                   voteDown={ () => voteDown(post.id) }
                    />
                )) }
                <button onClick={ () => this.setState({ createPostOpen: true }) }>create post</button>
                <Modal
                    isOpen={ this.state.createPostOpen }
                    ariaHideApp={ false }
                    contentLabel='create new post'
                    onRequestClose={ () => this.setState({ createPostOpen: false }) }
                >
                    <CreateOrUpdatePostComponent categories={ categories }
                                                 onComplete={ (post) => this.createPost(post) }/>
                </Modal>
            </div>
        )
    }
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    createPost: PropTypes.func.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired
}

export default PostList