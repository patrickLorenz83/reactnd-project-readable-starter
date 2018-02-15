import { connect }  from 'react-redux'
import * as Actions from '../../actions'
import Sort from './Sort'

const mapStateToProps = (state) => ({
    sortBy: state.posts.sortBy,
    sortOrder: state.posts.sortOrder
})

const mapDispatchToProps = (dispatch) => ({
    /**
     * @description Updating the sort order for posts in the store
     * @param sortOrder
     * @returns {*}
     */
    changeSortOrder:
        (sortOrder) => dispatch(Actions.changeSortOrder(sortOrder)),
    /**
     * @description Updating the sort element for posts in the store
     * @param sortBy
     * @returns {*}
     */
    changeSortBy:
        (sortBy) => dispatch(Actions.changeSortBy(sortBy))
})

const SortComponent = connect(mapStateToProps,mapDispatchToProps) (Sort)

export default SortComponent