import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Pager from './Pagers'
import Prev from './Prev'
import Next from './Next'
import Total from './Total'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Pagination = props => {

	const { className, currentPage, displayTotal, onChange, pageSize, total, pageCount, maxPageCount } = props
	
	const [paginationTotal, setPaginationTotal] = useState(total)
	const [internalPageSize, setInternalPageSize] = useState(pageSize)

	const getInternalPageCount = useMemo(() => {
		if (pageCount >= 0 && typeof pageCount === 'number')
			return pageCount;
		
		if (typeof paginationTotal === 'number') {
			return Math.ceil(paginationTotal / internalPageSize)
		} 
		return null
	}, [paginationTotal, internalPageSize, pageCount])

	
	const getValidCurrentPage = useCallback(count => {
		const value = parseInt(count, 10)
		let internalPageCount = getInternalPageCount
		let resetValue
		if (!internalPageCount) {
			if (isNaN(value) || value < 1) {
				resetValue = 1
			}
		} else {
			if (value < 1) {
				resetValue = 1
			}  
			if (value > internalPageCount) {
				resetValue = internalPageCount
			}
		}

		if ((resetValue === undefined && isNaN(value)) || resetValue === 0) {
			resetValue = 1
		}

		return resetValue === undefined ? value : resetValue
	}, [getInternalPageCount])

	const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage ? getValidCurrentPage(currentPage) : 1)

	useEffect(() => {
		if (total !== paginationTotal) {
			setPaginationTotal(total)
		}

		if (pageSize !== internalPageSize) {
			setInternalPageSize(pageSize)
		}

		if (currentPage !== internalCurrentPage) {
			setInternalCurrentPage(currentPage)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [total, pageSize, currentPage])

	const onPaginationChange = val => {
		setInternalCurrentPage(getValidCurrentPage(val))
		onChange?.(getValidCurrentPage(val))
	}

	const onPrev = useCallback(() => {
		const newPage = internalCurrentPage - 1
		setInternalCurrentPage(getValidCurrentPage(newPage))
		onChange?.(getValidCurrentPage(newPage))
	}, [onChange, internalCurrentPage, getValidCurrentPage])

	const onNext = useCallback(() => {
		const newPage = internalCurrentPage + 1
		setInternalCurrentPage(getValidCurrentPage(newPage))
		onChange?.(getValidCurrentPage(newPage))
	}, [onChange, internalCurrentPage, getValidCurrentPage])

	const pagerClass = {
		default: 'pagination-pager',
		inactive: 'pagination-pager-inactive',
		active: `text-teal-600 border border-teal-600 bg-teal-50 hover:bg-teal-50 dark:bg-teal-600 dark:text-gray-100`,
		disabled: 'pagination-pager-disabled'
	}

	const paginationClass = classNames('pagination', 'gap-y-2', className)
	
	if(!total) return null;
	return (
		<div className={paginationClass}>
			{
				displayTotal && <Total total={total}/>
			}

			<div className='flex'>
				<Prev 
					currentPage={internalCurrentPage}
					pagerClass={pagerClass}
					onPrev={onPrev}
				/>
				<Pager
					onChange={onPaginationChange}
					pageCount={getInternalPageCount}
					currentPage={internalCurrentPage}
					pagerClass={pagerClass}
					maxPageCount={maxPageCount}
				/>
				<Next 
					currentPage={internalCurrentPage}
					pageCount={getInternalPageCount}
					pagerClass={pagerClass}
					onNext={onNext}
				/>
			</div>
		</div>
	)
}

Pagination.propTypes = {
	total: PropTypes.number,
	displayTotal: PropTypes.bool,
	pageSize:  PropTypes.number,
	className: PropTypes.string,
	currentPage: PropTypes.number,
	onChange: PropTypes.func,
	maxPageCount: PropTypes.number
}

// Pagination.defaultProps = {
// 	pageSize: 1,
// 	currentPage: 1,
// 	total: 5,
// 	displayTotal: false,
// }

export default Pagination
