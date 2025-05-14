import React from 'react'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const DefaultLoading = props => {

	const { 
		loading,
		children, 
		spinnerClass, 
		className, 
		asElement: Component,
		customLoader,
		size
	} = props

	return (
		loading ?
		<Component className={classNames(!customLoader &&'flex items-center justify-center h-full', className)}>
			{
				customLoader ?
				<>{customLoader}</>
				:
				<Spinner className={spinnerClass} size={size} />
			}
		</Component>
		:
		<>{children}</>
	)
}

const CoveredLoading = props => {

	const { 
		loading,
		children, 
		spinnerClass, 
		coverClass,
		className, 
		asElement: Component,
		customLoader,
		size
	} = props


	return (
		<Component className={classNames(loading ? 'relative' : '', className)}>
			{children}
			{loading && (
				<div className="w-full h-full bg-white dark:bg-gray-800 dark:bg-opacity-60 bg-opacity-50 absolute inset-0 rounded-lg" />
			)}
			{loading && (
				<div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 text-center flex flex-col gap-4 items-center -translate-y-1/2 z-10 ${coverClass}`} >
					{
						customLoader ?
						<>{customLoader}</>
						:
						<Spinner className={spinnerClass} size={size} />
					}
					{props.message && <div className='text-theme font-medium text-sm'>{props.message}</div>}
				</div>
			)}
				
		</Component>
	)
}

const Loading = ({ loading = false, type = 'default', asElement = 'div', size = 40, ...rest }) => {
	const props = {loading, type, asElement, size, ...rest };
	switch (props.type) {
		case 'default':
			return <DefaultLoading {...props} />
		case 'cover':
			return <CoveredLoading {...props} />
		default:
			return <DefaultLoading {...props} />
	}
}

Loading.propTypes = {
	loading: PropTypes.bool,
	spinnerClass: PropTypes.string,
	type: PropTypes.oneOf(['default', 'cover']),
	customLoader: PropTypes.node,
	loadingClass: PropTypes.string,
	size: PropTypes.number
}

export default Loading