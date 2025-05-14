import React from 'react'
import classNames from 'classnames'
import { CgSpinner } from 'react-icons/cg'

const Spinner = React.forwardRef((props, ref) => {

    const { 
        className, 
        color,
        indicator: Component, 
        isSpining, 
        size, 
        style,
        ...rest 
    } = props

    const spinnerColor = color || 'teal-600';

    const spinnerStyle = {
        height: size,
        width: size,
        ...style
    }

    const spinnerClass = classNames(
        isSpining && 'animate-spin',
        spinnerColor && `text-${spinnerColor}`, 
        className
    )

    return (
        <Component ref={ref} style={spinnerStyle} className={spinnerClass} {...rest} />
    )
})

Spinner.defaultProps = {
    indicator: CgSpinner,
    isSpining: true,
    size: 24,
}

export default Spinner