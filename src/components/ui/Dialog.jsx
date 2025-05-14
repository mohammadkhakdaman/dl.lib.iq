import React from 'react'
import Modal from 'react-modal'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import CloseButton from './CloseButton'
import { motion } from 'framer-motion'
import useWindowSize from '@/utils/hooks/useWindowSize'

const smScreenSize = 640;
const Dialog = props => {

	const currentSize = useWindowSize()

	const { 
		children,
		className,
		closable,
		width,
		height,
		style,
		isOpen,
		onClose,
        title,
		bodyOpenClassName,
		portalClassName,
		overlayClassName,
		contentClassName,
		closeTimeoutMS,
        closeButtonClassName,
		...rest
	} = props

	const onCloseClick = e => {
		onClose(e)
	}

	const renderCloseButton = (
		<CloseButton onClick={onCloseClick} className={`ltr:right-2 rtl:left-2 top-2 ${closeButtonClassName || ''}`} absolute />
	)

    const renderTitle = (
        <div className='flex items-center justify-between bg-teal-600 text-white px-3 py-1 rounded-t-md'>
            {title}
            {
                closable && <CloseButton onClick={onCloseClick} size={22} className={`text-xl p-1 hover:bg-[#0001] rounded-full ${closeButtonClassName || ''}`} />
            }
        </div>
    )

	const contentStyle = {
		content: {
			inset: 'unset',
		},
		...style
	}
	
	if (width !== undefined) {
		contentStyle.content.width = width

		if (currentSize.width <= smScreenSize) {
			contentStyle.content.width = 'auto'
		}
	}
	if (height !== undefined) {
		contentStyle.content.height = height
	}

	const defaultDialogContentClass = 'dialog-content'

	const dialogClass = classNames(
		defaultDialogContentClass,
		contentClassName
	)

	return (
		<Modal
			className={{
				base: classNames('dialog', className),
				afterOpen: 'dialog-after-open',
				beforeClose: 'dialog-before-close'
			}}
			overlayClassName={{
				base: classNames('dialog-overlay', overlayClassName),
				afterOpen: 'dialog-overlay-after-open',
				beforeClose: 'dialog-overlay-before-close'
			}}
			portalClassName={classNames('dialog-portal', portalClassName)}
			bodyOpenClassName={classNames('dialog-open', bodyOpenClassName)}
			ariaHideApp={false}
			isOpen={isOpen}
			style={{...contentStyle}}
			closeTimeoutMS={closeTimeoutMS}
			{...rest}
		>
			<motion.div 
				className={dialogClass}
				initial={{transform: 'scale(0.9)' }} 
				animate={{
					transform: isOpen ? 'scale(1)' : 'scale(0.9)' 
				}}
			>
                { title && renderTitle }
				{closable && !title && renderCloseButton}
				{children}
			</motion.div>
		</Modal>
	)
}

Dialog.propTypes = {
	closable: PropTypes.bool,
	isOpen: PropTypes.bool.isRequired,
	overlayClassName: PropTypes.string,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onClose: PropTypes.func,
	portalClassName: PropTypes.string,
	contentClassName: PropTypes.string,
	closeTimeoutMS: PropTypes.number,
	bodyOpenClassName: PropTypes.string,
}

Dialog.defaultProps = {
	closable: true,
	width: 520,
	closeTimeoutMS: 150
}


export default Dialog