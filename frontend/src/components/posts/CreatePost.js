import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import * as Types           from '../../types'

class CreatePost extends Component {

    state = {
        title: '',
        comment: '',
        author: '',
        category: ''
    }

    handleSubmit = () => {
        event.preventDefault()
        this.props.createPost({
            title: this.state.title,
            body: this.state.comment,
            author: this.state.author,
            category: this.state.category
        })
    }

    render() {
        const { categories } = this.props

        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <input name='title'
                           onChange={ (event) => this.setState({ title: event.target.value }) }
                           placeholder='title'/>
                    <input name='comment'
                           onChange={ (event) => this.setState({ comment: event.target.value }) }
                           placeholder='comment'/>
                    <input name='author'
                           onChange={ (event) => this.setState({ author: event.target.value }) }
                           placeholder='author'/>
                    <select name='category'
                            value={ this.state.category }>
                        { categories && categories.map(category => (
                            <option key={ category.name }
                                    onChange={ (event) => this.setState({ category: event.target.value }) }
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
    categories: PropTypes.arrayOf(Types.Category).isRequired,
    createPost: PropTypes.func.isRequired,
    post: PropTypes.object
}
export default CreatePost