import React             from 'react'
import PropTypes         from 'prop-types'
import * as SortingUtils from '../../utils/sorting'

const SortComponent = ({ sortOrder, sortBy, changeSortOrder, changeSortBy }) => (
    <div>
        <select name={ sortOrder }
                onChange={ event => changeSortOrder(event.target.value) }
                value={ sortOrder }>
            <option value={ SortingUtils.SORT_ORDER_ASC }>{ SortingUtils.SORT_ORDER_ASC }</option>
            <option value={ SortingUtils.SORT_ORDER_DESC }>{ SortingUtils.SORT_ORDER_DESC }</option>
        </select>
        <select name={ sortBy }
                onChange={ event => changeSortBy(event.target.value) }
                value={ sortBy }>
            <option value={ SortingUtils.SORT_ORDER_VOTE }>vote</option>
            <option value={ SortingUtils.SORT_ORDER_TIME }>time</option>
        </select>
    </div>
)

SortComponent.propTypes = {
    sortOrder: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    changeSortBy: PropTypes.func.isRequired,
    changeSortOrder: PropTypes.func.isRequired
}

export default SortComponent