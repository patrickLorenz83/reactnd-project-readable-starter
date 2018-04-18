import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import * as Types           from '../../types'

class CreateOrUpdatePostComponent extends Component {

    state = {
        title: '',
        text: '',
        author: '',
        category: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onComplete(
            {
                title: this.state.title,
                body: this.state.text,
                author: this.state.author,
                category: this.state.category ? this.state.category : this.props.categories[ 0 ].name
            }
        )
    }

    componentDidMount() {
        const { post } = this.props

        console.log('creating post', post)
        post && this.setState({
            postId: post.id,
            title: post.title,
            text: post.body,
            author: post.author,
            category: post.category
        })
    }

    render() {
        const { categories } = this.props

        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <input name='title'
                           value={ this.state.title }
                           onChange={ (event) => this.setState({ title: event.target.value }) }
                           placeholder='title'/>
                    <input name='comment'
                           value={ this.state.text }
                           onChange={ (event) => this.setState({ text: event.target.value }) }
                           placeholder='text'/>
                    <input name='author'
                           value={ this.state.author }
                           onChange={ (event) => this.setState({ author: event.target.value }) }
                           placeholder='author'/>
                    <select name='category'
                            value={ this.state.category }
                            onChange={ (event) => this.setState({ category: event.target.value }) }>
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

CreateOrUpdatePostComponent.propTypes = {
    categories: PropTypes.arrayOf(Types.Category).isRequired,
    post: PropTypes.object,
    onComplete: PropTypes.func.isRequired
}
export default CreateOrUpdatePostComponent