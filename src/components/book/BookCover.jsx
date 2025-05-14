import appConfig from '@/config/appConfig'
import React from 'react'

function BookCover({bookId, className, ...rest}) {
  return (
    <img className={`h-full ${className || ''}`} src={`${appConfig.apiBaseUrl}/api/book/Cover/${bookId}`} alt="" {...rest}/>
  )
}

export default BookCover