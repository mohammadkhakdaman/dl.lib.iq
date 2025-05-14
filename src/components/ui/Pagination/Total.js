import React from 'react'

const Total = props => {
	const { total } = props
	return (
		<div className="pagination-total">
			تعداد رکوردها:‌ {total}
		</div>
	)
}

export default Total
