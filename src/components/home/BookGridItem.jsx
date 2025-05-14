import React from 'react'
import BookCover from '../book/BookCover'
import { FaBook } from 'react-icons/fa6'
import { BsBookmark } from 'react-icons/bs'
import { HiEye } from 'react-icons/hi'
import { useLanguage } from '../context/LanguageContext'
import Link from 'next/link'

const BookGridItem = ({book, className = ''}) => {
    return (
        <div className={`flex flex-col flex-grow flex-auto flex-shrink-1 items-center justify-center p-2 bg-gray-100 rounded ${className}`}>
            <BookCover bookId={book.BookId} className='w-full flex-grow-0 !h-64 object-scale-down rounded bg-white border mx-4 p-4' />
            
            <div className='flex flex-grow self-start my-3 text-gray-500 text-sm'>
                <FaBook className='inline-block mx-2 flex-shrink-0 h-5' />
                <span className='line-clamp-2'>{book.BookTitle}</span>
            </div>
            
            <BookGridItemBottomBar book={book}/>
        </div>
    )
}

export const BookGridItemBottomBar = ({book}) => {

    const { translations, language } = useLanguage()
    
    return (
        <div className='flex text-gray-500 items-center self-stretch border-gray-300'>
            <BsBookmark className='inline-block me-2'/>
            <div className='bg-gray-300 w-[1px] h-[16px]'></div>
            <span className='fu-num px-2 border-gray-300'>{book.Visit}</span>
            <HiEye className='inline-block'/>
            <div className='flex-grow'></div>
            <Link className="text-white ms-2 px-4 py-1 bg-yellow-600 text-sm rounded hover:bg-yellow-500"
                href={`/${language}/books/${book.BookId}/1`}>
                {translations.view}
            </Link>
        </div>
    )
}

export default BookGridItem;