import React, { Component }        from 'react'
import PropTypes                   from 'prop-types'
import { Link }                    from 'react-router-dom'
import CreateOrUpdatePostComponent from './CreateOrUpdatePostComponent'
import * as Types                  from '../../types'
import Modal                       from 'react-modal'


class PostComponent extends Component {

    state = {
        modalOpen: false
    }

    /**
     * @description Closing the post update modal dialog and calling the action to submitting the data to backend.
     * @param post, new post data
     */
    updatePost = (post) => {
        this.setState({ modalOpen: false })
        this.props.updatePost(post)
    }

    render() {
        const { post, full, categories } = this.props

        const postKey = post.id ? post.id : Date.now()

        return (
            <div key={ postKey }
                 className='postList'>
                <p>title: { post.title }</p>
                <p>body: { post.body }</p>
                <p>author: { post.author }</p>
                <p>category: { post.category }</p>
                <p>voteScore: { post.voteScore }</p>
                { full
                  ?
                  <div>
                      <button onClick={ () => this.setState({ modalOpen: true }) }>update post</button>

                  </div>
                  :
                  <div>
                      <Link to={ `/post/${post.id}` }
                            key={ postKey }>Details</Link>
                  </div>
                }
                <Modal
                    isOpen={ this.state.modalOpen }
                    contentLabel='update post'
                    onRequestClose={ () => this.setState({ modalOpen: false }) }
                >
                    <CreateOrUpdatePostComponent categories={ categories }
                                                 post={ post }
                                                 onComplete={ (post) => this.updatePost(post) }/>
                </Modal>
            </div>
        )
    }
}

PostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(Types.Category),
    full: PropTypes.bool.isRequired,
    updatePost: PropTypes.func
}

export default PostComponent