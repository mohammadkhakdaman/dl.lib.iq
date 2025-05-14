import { useLanguage } from "@/components/context/LanguageContext";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaBook } from "react-icons/fa";
import CryptoJS from 'crypto-js';
import { config } from "@/utils/config";
import appConfig from "@/config/appConfig";

// const authorsImage = {
//     'الشيخ ناصر مكارم الشيرازي': '/static/authors/makarem.jpg',
//     'السيد علي الحسيني الميلاني': '/static/authors/milani.jpg',
//     'الشيخ السبحاني': '/static/authors/sobhani.jpg',
//     'محمد الريشهري': '/static/authors/reyshahri.jpg',
//     'السيد الخميني': '/static/authors/khomeini.jpeg',
//     'الشيخ فاضل اللنكراني': '/static/authors/fazel.jpg',
//     'السيد محمد صادق الروحاني': '/static/authors/rouhani.jpg',
// }

const AuthorsGrid = ({ items, onClick }) => {
    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 p-8">
            {items.map((item, index) => (
                <AuthorItem item={item} key={item.key} onClick={() => onClick(item)} />
            ))}
        </div>
    );
}

const getAuthorImage = (authorName) => {
    const hash = CryptoJS.MD5(authorName.trim()).toString();
    return `${appConfig.apiBaseUrl}/api/Authorities/getAuthorImage/${hash}`;
};

const AuthorItem = ({ item, onClick }) => {
    const authorImage = getAuthorImage(item.key) || '/static/authors/no-image.svg';
    const {language} = useLanguage();

    return (
        <div className="rounded bg-gray-100 border" onClick={onClick}>
            <img src={authorImage} alt={item.key} className="w-full h-48 object-cover rounded-t" />
            <div className="text-normal p-2 mt-2">{item.key}</div>
            <div className="px-2 flex items-center gap-1 mb-[2px]">
                <FaBook className="text-teal-600"/>
                <span className="text-teal-600 text-sm">عنوان کتاب: </span>
                <span className="text-sm fu-num">{item.doc_count}</span>
                <div className="flex-grow"></div>
                <Link className="p-2 text-gray-400 hover:text-teal-600 text-sm cursor-pointer hover:bg-gray-200 rounded"
                    href={`/${language}/books?limit=[{"type":"author","value":"${item.key}"}]`}
                    target="_blank">
                    <FaArrowLeft />
                </Link>
            </div>
        </div>
    )
}

export default AuthorsGrid;