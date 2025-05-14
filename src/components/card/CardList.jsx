import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "../context/LanguageContext"
import BookCover from '../book/BookCover'
import { FaBook, FaEye, FaHeart } from "react-icons/fa"
import { IoEye } from 'react-icons/io5'
import { useMemo } from "react"

export default function CardList({ item, injectModal }) {
    const searchParams = useSearchParams()
    const {language} = useLanguage()

    const contetnModal = () => {
        let data = {
            biblioId: item.biblioId,
            bookId: item.bookId,
            pages: item.pages
        }

        injectModal({ data: data, modalInfo: { title: `مشاهده نتیجه ' ${searchParams.get('q')} ' در کتاب ${item.bookTitle}`, show: true } })
    }

    return (
        <div className="p-4 bg-gray-100 border rounded relative mx-auto w-full text-sm">
            <div className="flex items-center justify-between gap-2">

                <FieldValue title={<FaBook className="inline-block"/>} value={item.bookTitle} valueClassName={'font-bold text-gray-800'}/>
                <div className="w-[1px] bg-gray-300 h-[18px]"></div>
                <FieldValue title={'نویسنده:'} value={item.author}/>
                <div className="w-[1px] bg-gray-300 h-[18px]"></div>
                <FieldValue title={'موضوع:'} value={item.subject}/>
                <div className="w-[1px] bg-gray-300 h-[18px]"></div>
                <FieldValue title={'تعداد نتایج این کتاب:'} value={0} valueClassName={'fu-num'}/>
                
            </div>
            {
                Array.isArray(item.description) && item.description.length > 0 &&
                <div>
                    <span>توضیحات: </span>
                    <span>{item.description.join(' ')}</span>
                </div>
            }

            <div className="flex items-start mt-6 gap-5 p-2">
                <div>
                    <BookCover bookId={item.bookId} className='w-[150px] shadow-lg rounded-lg'/>
                    <div className="mt-3 text-center text-gray-500 flex items-center justify-center text-base">
                        <span className="fu-num mx-1">0</span>
                        <FaHeart className='inline-block'/>
                        <span className="mx-2">|</span>
                        <span className="fu-num">0</span>
                        <IoEye className='inline-block mx-1'/>
                    </div>
                </div>
                <div className="flex gap-2 flex-col flex-1">
                    {
                        item?.pages?.map((page) => {
                            return (
                                <div className="p-3 border border-gray-300 bg-white rounded-lg flex gap-2 items-start">
                                    <span className="fu-num text-teal-600 flex-shrink-0">صفحه {page.bookPageNumber}: </span>
                                    <div dangerouslySetInnerHTML={{__html: page.bookPage}} className="text-gray-500"></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )


    // return (
    //     <div className="p-4 bg-gray-100 border rounded relative mx-auto w-full">
    //         <div className="flex">
    //             <div className="flex justify-center relative rounded-lg overflow-hidden h-52 w-[134px]">
    //                 <div className="flex justify-center transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
    //                     <Link href={item?.pages?.length > 0 ? `/${language}/books/${item.bookId}/${item.pages[0].bookPageNumber}` : `/${language}/books/${item.bookId}/1`}>
    //                         <BookCover bookId={item.bookId}/>
    //                     </Link>
    //                 </div>
    //             </div>
    //             <div className="p-3 w-[76%]">
    //                 <div>
    //                     {/* <Link href={item?.pages?.length > 0 ? `/${item.biblioId}/books/${item.bookId}/#p${item.pages[0].bookPageNumber}` : `/${item.biblioId}/books/${item.bookId}`} className="relative inline-block duration-300 ease-in-out transition-transform transform hover:scale-[0.98] w-full"> */}
    //                     <Link href={item?.pages?.length > 0 ? `/${language}/books/${item.bookId}/${item.pages[0].bookPageNumber}` : `/${language}/books/${item.bookId}/1`}>
    //                         <h2 className="font-medium text-base md:text-lg line-clamp-1" title={item.bookTitle}>
    //                             {item.bookTitle}
    //                         </h2>
    //                     </Link>
    //                     <div className="flex justify-between">
    //                         {
    //                             item?.pages?.length > 0 && <ul className="my-2">
    //                                 {
    //                                     item.pages?.map((page, index) => {
    //                                         if (index < 2) {
    //                                             return <li className="flex line-clamp-1" key={page.bookPageNumber}>
    //                                                 <span>{index + 1}. </span>
    //                                                 <Link className="line-clamp-1 w-full ms-1" href={`/${language}/books/` + item.bookId + '/' + page.bookPageNumber} dangerouslySetInnerHTML={{ __html: page.bookPage }}></Link>
    //                                                 {/* <Link href={item.biblioId + '/' + item.bookId + '/' + page.bookPageNumber} dangerouslySetInnerHTML={{ __html: page.bookPage }}></Link> */}
    //                                             </li>
    //                                         }
    //                                     })
    //                                 }
    //                                 <li>
    //                                     {
    //                                         item.pages?.length > 1 && <button onClick={() => { contetnModal() }} className="h-[30px] ltr bg-blue-600 rounded-md text-white hover:shadow-md hover:scale-105 duration-75 px-1 flex justify-center items-center">+{item?.pages?.length - 1}</button>
    //                                     }
    //                                 </li>
    //                             </ul>
    //                         }

    //                     </div>

    //                     <p className="mt-2 text-sm text-gray-800 line-clamp-1" title={item.publisher[0]}>
    //                         {
    //                             item.publisher?.map((publisher, i, row) => {
    //                                 return <span key={i}>
    //                                     {publisher}
    //                                 </span>
    //                                 // if (i + 1 === row.length) {
    //                                 //     return <span>
    //                                 //         {publisher}
    //                                 //     </span>
    //                                 // } else {
    //                                 //     return <span>
    //                                 //         {publisher}
    //                                 //     </span>
    //                                 // }
    //                             })
    //                         }
    //                     </p>
    //                 </div>

    //                 <div className="mt-3">
    //                     <p className="h-[64px] line-clamp-2 text-gray-800">
    //                         {
    //                             item.subject?.map((subject, i, row) => {
    //                                 return <span key={i}>
    //                                     {subject}
    //                                 </span>
    //                                 // if (i + 1 === row.length) {
    //                                 //     return <span>
    //                                 //         {subject}
    //                                 //     </span>
    //                                 // } else {
    //                                 //     return <span>
    //                                 //         {subject}
    //                                 //     </span>
    //                                 // }
    //                             })
    //                         }
    //                     </p>

    //                     {/* <span className="inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
    //                         {item.description}
    //                     </span> */}
    //                 </div>

    //             </div>
    //         </div>


    //         <div className="mt-6 pt-3" style={{ borderTop: '1px solid #ddd' }}>
    //             <div className="flex items-center">
    //                 <div className="relative">
    //                     <div className="flex items-center justify-center text-gray-600 rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200">
    //                         <i className="fa fa-user"></i>
    //                     </div>
    //                 </div>

    //                 <p className="ms-2 text-gray-800 line-clamp-1">
    //                     {item.author[0]}
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    // )
}

const FieldValue = ({title, value, className, titleClassName, valueClassName}) => {
    const displayVal = useMemo(() => {
        if(Array.isArray(value)) 
            return value.join(' - ');

        return value ?? '';
    }, [value])
  return (
    <div className={className}>
        <span className={`text-teal-600 ${titleClassName || ''}`}>{title}</span>
        <span className={`ms-1 text-gray-500 ${valueClassName}`}>{displayVal}</span>
    </div>
  )
}
