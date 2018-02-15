import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import * as Types           from '../../types'

class CreatePost extends Component {
    handleSubmit = (event) => {
        event.preventDefault()
        console.log('handle props', this.props)
        this.props.createPost({
            title: event.target.title.value,
            body: event.target.comment.value,
            author: event.target.author.value,
            category: event.target.category.value
        })
    }

    render() {
        const { categories } = this.props

        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <input name='title'
                           placeholder='title'/>
                    <input name='comment'
                           placeholder='comment'/>
                    <input name='author'
                           placeholder='author'/>
                    <select name='category'>
                        { categories && categories.map(category => (
                            <option key={ category.name }
                                    value={ category.name }>{ category.name }</option>
                        )) }
                    </select>
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

CreatePost.propTypes = {
    categories: PropTypes.arrayOf(Types.Category),
    createPost: PropTypes.func.isRequired
}
export default CreatePost