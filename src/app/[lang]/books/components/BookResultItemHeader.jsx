import { FaBook } from "react-icons/fa"
import FieldValue from './FieldValue'
import Link from "next/link";
import { useLanguage } from "@/components/context/LanguageContext";

const BookResultItemHeader = ({book, count, className}) => {
    const {language} = useLanguage();
    return (
        <div className={className}>
            <div className="flex items-center justify-between gap-2">
                <Link href={`/${language}/books/${book?.bookId}/1`} target="_blank">
                    <FieldValue title={<FaBook className="inline-block"/>} className={'hover:underline'} value={book?.bookTitle || ''} valueClassName={'font-bold text-gray-800 text-base'}/>
                </Link>
                <div className="w-[1px] bg-gray-300 h-[18px]"></div>
                <FieldValue title={'نویسنده:'} value={book?.author || ''}/>
                <div className="w-[1px] bg-gray-300 h-[18px]"></div>
                <FieldValue title={'موضوع:'} value={book?.subject || ''}/>
                <div className="w-[1px] bg-gray-300 h-[18px]"></div>
                <FieldValue title={'تعداد نتایج:'} value={count || book?.pages?.length || 0} valueClassName={'fu-num'}/>

            </div>
            {
                Array.isArray(book?.description) && book.description.length > 0 &&
                <div>
                    <span>توضیحات: </span>
                    <span>{book.description.join(' ')}</span>
                </div>
            }
        </div>
    )
}

export default BookResultItemHeader;