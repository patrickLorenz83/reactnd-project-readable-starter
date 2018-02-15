import React      from 'react'
import PropTypes  from 'prop-types'
import * as Types from '../../types'
import { Link }   from 'react-router-dom'

const CategoryList = ({ categories, label }) => (
    <div>
        { label && <div>{ label }</div> }
        { categories && categories.length > 0 && categories.map(category =>
            <Link className='categoryLink'
                  to={ category.path }
                  key={ category.name }>{ category.name }
            </Link>)
        }
    </div>
)

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(Types.Category),
    label: PropTypes.string
}

export default CategoryList