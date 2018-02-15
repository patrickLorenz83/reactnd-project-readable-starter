import PropTypes from 'prop-types'

export const Category = PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
})