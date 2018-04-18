import React         from 'react'
import PropTypes     from 'prop-types'
import PostComponent from './PostComponent'

const PostList = ({ posts }) => (
    <div>
        Posts:
        { posts && posts.length > 0 && posts.map(post => (
            <PostComponent post={ post }
                           full={ false }/>
        )) }
    </div>
)

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList