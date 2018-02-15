import React     from 'react'
import PropTypes from 'prop-types'

const PostList = ({ posts }) => (
    <div>
        Posts:
        { posts && posts.length > 0 && posts.map(post => (
            <div key={ post.id ? post.id : Date.now() }
                 className='postList'>
                <p>title: { post.title }</p>
                <p>body: { post.body }</p>
                <p>author: { post.author }</p>
                <p>category: { post.category }</p>
                <p>voteScore: { post.voteScore }</p>
            </div>
        )) }
    </div>
)

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList