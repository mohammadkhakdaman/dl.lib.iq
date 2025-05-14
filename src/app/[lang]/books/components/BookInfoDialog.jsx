import Dialog from '@/components/ui/Dialog'
import { FaBook } from "react-icons/fa"
import FieldValue from './FieldValue'
import BookResultItemHeader from './BookResultItemHeader';
import Pagination from "@/components/ui/Pagination";
import { useRef, useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';
import { BookService } from '@/service/BookService';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/context/LanguageContext';

const BookInfoDialog = ({object: book, ...dialogProps}) => {
    const {language} = useLanguage();
    const resultDiv = useRef(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const [data, setData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const pageSize = 10;

    useEffect(() => {
        if(dialogProps?.isOpen && book)
            fetchData();
        else{
            setPage(1);
            setData(null);
        }
    }, [dialogProps?.isOpen, book, page]);

    const fetchData = async () => {
        setLoading(true);
        const q = [searchParams.get('q'), searchParams.get('exact'), searchParams.get('and'), searchParams.get('or'), searchParams.get('not')].join(',');
        const res = await BookService.searchInBook({bookId: book?.bookId, q, offset: page, count: pageSize});
        
        if(res.success === false) {
            setHasError(true);
        }
        setLoading(false);
        setData(res.data);
        if(resultDiv.current)
            resultDiv.current.scrollTo({top: 0});
    }

    if(!dialogProps?.isOpen || !book)
        return null;

    return (
        <Dialog {...dialogProps} title={`کتاب ${book?.bookTitle}`} width={'auto'} contentClassName='!bg-gray-100'>
            <BookResultItemHeader book={data?.resultList?.[0] || book} count={data?.count} className={'bg-teal-50 p-3'}/>
            <Loading className="flex gap-2 min-h-32 flex-col flex-1 border-b" type='cover' loading={loading}>
                <div className='overflow-auto flex gap-2 flex-col p-6' ref={resultDiv}>
                {
                    hasError && 
                    <div className="p-3 text-center text-red-600">
                        دریافت نتایج با خطا مواجه شد!
                    </div>
                }
                {
                    data?.resultList?.[0].pages?.map((item, index) => {

                        // if(index < (pageSize * (page - 1)) || index >= (pageSize * page))
                        //     return null;

                        return (
                            <Link key={item.bookPageNumber} 
                                    href={`/${language}/books/${book?.bookId}/${item.bookPageNumber}`} 
                                    target="_blank"
                                className="p-3 border border-gray-300 bg-white rounded-lg flex gap-2 items-start">
                                <span className="fu-num text-teal-600 flex-shrink-0">صفحه {item.bookPageNumber}: </span>
                                <div dangerouslySetInnerHTML={{__html: item.bookPage}} className="text-gray-500"></div>
                            </Link>
                        )
                    })
                }
                </div>
            </Loading>
            {
                data?.count > pageSize && 
                <Pagination total={data?.count || 0} onChange={setPage} currentPage={page} pageSize={pageSize} className={'self-center my-4 fu-num'}/>
            }
        </Dialog>
    )
}


export default BookInfoDialog;