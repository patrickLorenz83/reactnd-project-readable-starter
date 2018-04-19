import React     from 'react'
import PropTypes from 'prop-types'

const VoteComponent = ({ voteUp, voteDown }) =>
    <div>
        <button onClick={ voteUp }>vote up</button>
        <button onClick={ voteDown }>vote down</button>
    </div>


VoteComponent.propTypes = {
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired
}

export default VoteComponent