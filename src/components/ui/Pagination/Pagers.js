import React, { useState, useEffect, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { 
	HiOutlineChevronDoubleLeft,
	HiOutlineDotsHorizontal, 
	HiChevronDoubleRight 
} from 'react-icons/hi'

const NextMore = ({className, onArrow}) => {
	
	const [quickNextArrowIcon, setQuickNextArrowIcon] = useState(false)

	return (
		<li
			className={className}
			onMouseEnter={() => { setQuickNextArrowIcon(true) }}
			onMouseLeave={() => { setQuickNextArrowIcon(false) }}
			onClick={() => onArrow('nextMore')}
		>
			{quickNextArrowIcon ? <HiChevronDoubleRight /> : <HiOutlineDotsHorizontal /> }
		</li>
	)
}

const PrevMore = ({className, onArrow}) => {

	const [quickPrevArrowIcon, setQuickPrevArrowIcon] = useState(false)

	return (
		<li
			className={className}
			onMouseEnter={() => { setQuickPrevArrowIcon(true) }}
			onMouseLeave={() => { setQuickPrevArrowIcon(false) }}
			onClick={() => onArrow('prevMore')}
		>
			{quickPrevArrowIcon ? <HiOutlineChevronDoubleLeft /> : <HiOutlineDotsHorizontal /> }
		</li>
	)
}

const Pagers = props => {

	const { 
		pageCount, 
		currentPage, 
		onChange,
		pagerClass,
		maxPageCount = 7
	} = props

	const [showPrevMore, setShowPrevMore] = useState(false)
	const [showNextMore, setShowNextMore] = useState(false)
	
	useEffect(() => {
		if (pageCount > maxPageCount) {
			if (currentPage > maxPageCount - 2) {
				setShowPrevMore(true)
			}
			if (currentPage < pageCount - 2) {
				setShowNextMore(true)
			}
			if(currentPage >= pageCount - 3 && currentPage <= pageCount) {
				setShowNextMore(false)
			}
			if(currentPage >= 1 && currentPage <= 4) {
				setShowPrevMore(false)
			}
		} else {
			setShowPrevMore(false)
			setShowNextMore(false)
		}
		
	}, [currentPage, pageCount])


	const onPagerClick = (value, e) => {

		e.preventDefault()
		let newPage = value

		if (newPage < 1) {
			newPage = 1
		}
		if (newPage > pageCount) {
			newPage = pageCount
		}
		
		if (newPage !== currentPage) {
			onChange(newPage)
		}
	}


	const onArrowClick = useCallback(e => {
		let newPage = currentPage
		if (e === 'nextMore') {
			newPage = currentPage + (maxPageCount - 2)
		}
		if (e === 'prevMore') {
			newPage = currentPage - (maxPageCount - 2)
		}
		onChange(newPage)
	}, [currentPage, onChange])

	const getPages = useMemo(() => {
		const pagerArray = []
		if (showPrevMore && !showNextMore) {
			const startPage = pageCount - (maxPageCount - 2)
			for (let i = startPage; i < pageCount; i++) {
				pagerArray.push(i)
			}
		} else if (!showPrevMore && showNextMore) {
			for (let i = 2; i < maxPageCount; i++) {
				pagerArray.push(i)
			}
		} else if (showPrevMore && showNextMore) {
			const offset = Math.floor(maxPageCount / 2) - 1
			const maxRange = currentPage >= pageCount - 2 && currentPage <= pageCount
			for (let i = currentPage - offset; i <= currentPage + (maxRange ? 0 : offset); i++) {
				pagerArray.push(i)
			}
		} else {
			for (let i = 2; i < pageCount; i++) {
				pagerArray.push(i)
			}
		}
		if(pagerArray.length > (maxPageCount - 2)) {
			return []
		}
			
		return pagerArray
	}, [showPrevMore, showNextMore, currentPage, pageCount])

	const getPagerClass = index => {
		return classNames(pagerClass.default, currentPage == index ? pagerClass.active : pagerClass.inactive)
	}
	
	return (
		<>
			{
				pageCount > 0 &&
				<div className={getPagerClass(1)} onClick={e => onPagerClick(1, e)} tabIndex="0">
					1
				</div>
			}
			{
				showPrevMore 
				&& 
				<PrevMore 
					onArrow={arrow => onArrowClick(arrow)} 
					className={classNames(pagerClass.default, pagerClass.inactive, 'border-none')} 
				/>
			}
			{
				
				getPages.map((pager, index) => {
					return (
						<div key={index} className={getPagerClass(pager)} onClick={e => onPagerClick(pager, e)} tabIndex="0">
							{pager}
						</div>
					)
				})
			
			}
			{
				showNextMore 
				&& 
				<NextMore 
					onArrow={arrow => onArrowClick(arrow)} 
					className={classNames(pagerClass.default, pagerClass.inactive, 'border-none')} 
				/>
			}
			{pageCount > 1 &&
				<div className={getPagerClass(pageCount)} onClick={e => onPagerClick(pageCount, e)} tabIndex="0">
					{pageCount}
				</div>
			}
		</>
	)
}

export default Pagers
