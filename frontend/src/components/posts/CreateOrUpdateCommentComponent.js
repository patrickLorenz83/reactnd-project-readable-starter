import React, { Component } from 'react'
import PropTypes            from 'prop-types'

class CreateOrUpdateCommentComponent extends Component {

    state = {
        text: '',
        author: '',
    }

    static propTypes = {
        comment: PropTypes.object,
        postId: PropTypes.string,
        onComplete: PropTypes.func.isRequired
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onComplete(
            {
                parentId: this.props.postId,
                id: this.state.commentId,
                body: this.state.text,
                author: this.state.author,
            }
        )
    }

    componentDidMount() {
        const { postId, comment } = this.props
        comment && this.setState({
            postId,
            commentId: comment.id,
            text: comment.body,
            author: comment.author,
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <input name='comment'
                           value={ this.state.text }
                           onChange={ (event) => this.setState({ text: event.target.value }) }
                           placeholder='text'/>
                    <input name='author'
                           value={ this.state.author }
                           onChange={ (event) => this.setState({ author: event.target.value }) }
                           placeholder='author'/>
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

export default CreateOrUpdateCommentComponent