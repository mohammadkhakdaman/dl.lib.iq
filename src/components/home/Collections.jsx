"use client";
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SubjectService } from '@/service/SubjectService';
import Loading from '../ui/Loading';
import { FaBook, FaSquare } from 'react-icons/fa6';
import BookCover from '../book/BookCover';
import { FaArrowLeft } from 'react-icons/fa';
import { BsBookmark, BsEye } from "react-icons/bs";
import { IoEye } from 'react-icons/io5';
import { HiEye } from 'react-icons/hi';
import BookGridItem from './BookGridItem';


export default function Collections() {
    const { translations, language } = useLanguage()
    const [selectedSubject, setSelectedSubject] = useState('')
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        SubjectService.getBooksBySubject(selectedSubject, 4).then((res) => {
            setLoading(false);
            if(res.success) {
                setBooks(res.data?.books);
            }
        });
    }, [selectedSubject]);

    return <>

        <section style={{ "backgroundImage": "url('/static/media/theme/Group\ 31435.jpg')" }}
            className="relative w-full h-auto lg:px-12 xl:px-22 2xl:px-72 md:px-24 sm:px-16 px-4 py-14">
            <img src="/static/media/theme/Rectangle 12969.png" width="100%" alt="" />

            <div className="flex justify-between relative -top-4">
                <div style={{ display: "block ruby" }} className="bg-[#369090] pe-4 text-white">
                    <FaSquare className='text-white rotate-45' size={10} />
                    <h2 className='ms-2'>
                        {translations.collections}
                    </h2>
                </div>
                <div className="bg-[#369090] ps-2">
                    <Link className="bg-white border text-normal border-gray-300 px-4 rounded" href={`/${language}/authorities`}>
                        {translations.view_all}
                    </Link>
                </div>
            </div>
            
            <TopSubjects onSubjectSelect={setSelectedSubject}/>

            <div className='flex justify-around px-10 mt-8 gap-4 space-y-6 lg:space-y-0' style={{flexGrow: 1}}>
                <div className='grid lg:grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-2'>
                {
                    books?.map((book, index) => {   
                        return <BookGridItem key={book.BookId} book={book}/>
                    })
                }
                </div>

                <Link href={`/${language}/books?limit=[{"type":"subject","value":"${selectedSubject}"}]`} target='_blank' style={{ "alignSelf": "stretch" }}
                    className="flex px-1 text-teal-600 justify-center content-center items-center flex-wrap width-[50px] bg-white rounded-md">
                    <FaArrowLeft className=''/>
                    <span className="order:1 md:order-0 w-auto mx-1 md:mx-0 md:w-full ">{translations.more}</span>
                </Link>
            </div>
        </section>


    </>
}

const TopSubjects = ({onSubjectSelect}) => {
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');

    useEffect(() => {
        SubjectService.topFourSubjects().then((res) => {
            setLoading(false);
            if(res.success) {
                setSubjects(res.data);
                if(res.data?.length > 0) {
                    setSelectedSubject(res.data[0].key);
                    onSubjectSelect?.(res.data[0].key);
                }
            }
        });
    }, []);

    const handleSelectSubject = (subject) => {
        setSelectedSubject(subject);
        onSubjectSelect?.(subject);
    }

    return (
        <Loading loading={loading} type='cover' className='flex gap-5 items-center justify-center flex-wrap'>
        {
            subjects?.map(sub => {
                return <TopSubjectButton key={sub.key} title={sub.key} isSelected={selectedSubject === sub.key} onClick={handleSelectSubject}/>
            })
        }
        </Loading>
    )
}

const TopSubjectButton = ({ title, isSelected, onClick }) => {
    
    const clazz = classNames(
        'py-1 px-4 text-normal text-gray-700 transition duration-200 rounded shadow-md bg-gray-50',
        isSelected && 'active',
        !isSelected && 'hover:bg-[#DBA100] hover:text-white cursor-pointer'
    )

    return (
        <button className={clazz } onClick={() => onClick(title)}>
            {title}
        </button>
    )
}