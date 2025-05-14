import { SubjectService } from "@/service/SubjectService";
import React, { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaBook } from "react-icons/fa";
import { FaChevronLeft, FaCircleChevronDown, FaCircleChevronLeft } from "react-icons/fa6";
import BookItem from "./BookItem";
import classNames from "classnames";
import useResponsive from "@/utils/hooks/useResponsive";
import Loading from "@/components/ui/Loading";
import Link from "next/link";
import { useLanguage } from "@/components/context/LanguageContext";


const AuthoritiesGrid = ({ items, onClick }) => {
    const [expandedKey, setExpandedKey] = useState('');
    return (
        <div className="flex flex-col gap-4 p-8">
            {items.map((item, index) => (
                <AuthoritiyItem item={item} expanded={expandedKey == item.key} key={index} onClick={() => setExpandedKey(item.key == expandedKey ? '' : item.key)} />
            ))}
        </div>
    );
}

const AuthoritiyItem = ({ item, onClick, expanded }) => {
    const clazz = classNames(
        'rounded-lg border py-1 pe-3 ps-6 hover:bg-gray-100',
        expanded && 'bg-gray-50',
        !expanded && 'odd:bg-gray-50'
    )
    return (
        <div className={clazz}>
            <div className="flex items-center gap-2 text-gray-500 cursor-pointer" onClick={onClick}>
                {
                    expanded
                        ? <FaCircleChevronDown className="text-orange-600 " size={16}/>
                        : <FaCircleChevronLeft className="text-teal-600" size={16}/>
                }
                <div className="text-normal">{item.key}</div>
                <div className="flex-grow"></div>
                <span className="text-teal-600 text-sm">عنوان کتاب: </span>
                <span className="text-sm fu-num">{item.doc_count}</span>
            </div>

            {expanded && <AuthoritiyItemDetails item={item}/>}
        </div>
    )
}

const AuthoritiyItemDetails = ({item}) => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const {larger} = useResponsive();
    const itemsPerPage = larger.lg ? 3 : (larger.md ? 2 : 1);
    const {language } = useLanguage();

    useEffect(() => {
        setLoading(true);
        SubjectService.getBooksBySubject(item.key, 12).then(res => {
            setItems(res?.data)
            setLoading(false);
        })
    }, [])

    const totalPages = Math.ceil(items?.books?.length / itemsPerPage);

    const currentItems = useMemo(() => {
        return items?.books?.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
        ); 
    }, [currentPage, itemsPerPage, items]) 

    if(loading)
        return <Loading loading={true} className='m-4' size={24}/>


    return (
        <div className="relative">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mx-2 my-4">
            {
                currentItems?.map(book => {
                    return <Link href={`/${language}/books/${book.BookId}/1`} target="_blank">
                        <BookItem book={book} key={book.BookId}/>
                    </Link>
                })
            }
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-1 py-4">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                currentPage === index 
                                    ? "bg-teal-600" 
                                    : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            <Link className="absolute left-3 bottom-1 text-teal-700 text-sm cursor-pointer hover:bg-teal-50 rounded-lg   p-2"
                href={`/${language}/books?limit=[{"type":"subject","value":"${item.key}"}]`}
                target="_blank">
                <span>مشاهده بیشتر</span>
                <FaChevronLeft className="ms-2 inline-block"/>
            </Link>
        </div>
    )
}

export default AuthoritiesGrid;