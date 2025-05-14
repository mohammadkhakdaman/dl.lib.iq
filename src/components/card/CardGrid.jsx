
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "../context/LanguageContext"
import BookCover from "../book/BookCover"

export default function CardGrid({ item, injectModal }) {

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
    return <>
        <div className="relative mx-auto w-full">
            <div className="shadow-md p-4 rounded-lg bg-white">
                <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                    <div className="flex justify-center transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
                        <BookCover bookId={item.bookId}/>
                        {/* <Link href={item?.pages?.length > 0 ? `/${item.biblioId}/books/${item.bookId}/#p${item.pages[0].bookPageNumber}` : `/${item.biblioId}/books/${item.bookId}`}> */}
                        <Link href={item?.pages?.length > 0 ? `/${language}/books/${item.bookId}/${item.pages[0].bookPageNumber}` : `/books/${item.bookId}/1`}>
                            <div className="absolute inset-0 bg-black opacity-10">
                            </div>
                        </Link>
                    </div>
                    {/* <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
                            Featured
                            </span> */}
                </div>

                <div className="mt-4">
                    {/* <Link href={item?.pages?.length > 0 ? `/${item.biblioId}/books/${item.bookId}/#p${item.pages[0].bookPageNumber}` : `/${item.biblioId}/books/${item.bookId}`} className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full"> */}
                    <Link href={item?.pages?.length > 0 ? `/${language}/books/${item.bookId}/${item.pages[0].bookPageNumber}` : `/books/${item.bookId}/1`} className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
                        <h2 className="font-medium text-base md:text-lg line-clamp-1" title={item.bookTitle}>
                            {item.bookTitle}
                        </h2>
                    </Link>
                    <div className="flex justify-between">
                        {
                            item?.pages?.length > 0 && <Link className="line-clamp-1 w-full" href={`/${language}/books/` + item.bookId + '/' + item.pages[0].bookPageNumber} dangerouslySetInnerHTML={{ __html: item.pages[0].bookPage }}></Link>
                        }
                        {
                            item?.pages?.length > 1 && <button onClick={() => { contetnModal() }} className="h-[30px] ltr bg-blue-600 rounded-md text-white hover:shadow-md hover:scale-105 duration-75 px-1 flex justify-center items-center">+{item?.pages?.length - 1}</button>
                        }

                    </div>
                    <p className="mt-2 text-sm text-gray-800 line-clamp-1" title={item.publisher[0]}>
                        {item.publisher[0]}
                    </p>
                </div>

                <div className="mt-3">
                    <p className="h-[64px] line-clamp-2 text-gray-800">
                        {item.subject[0]}
                    </p>
                </div>

                <div className="mt-8">
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="flex items-center justify-center text-gray-600 rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200">
                                <i className="fa fa-user"></i>
                            </div>
                        </div>

                        <p className="ms-2 text-gray-800 line-clamp-1">
                            {item.author[0]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}