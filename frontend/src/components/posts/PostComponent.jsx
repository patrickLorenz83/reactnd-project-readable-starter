import React     from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'

const PostComponent = ({ post, full }) => {

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
              <div>full</div>
              :
              <div>
                  <Link to={ `/post/${post.id}` }
                        key={ postKey }>Details</Link>
              </div>
            }
        </div>
    )
}
PostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    full: PropTypes.bool.isRequired
}

export default PostComponent