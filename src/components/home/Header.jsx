import { useEffect } from "react"
import { useLanguage } from "../context/LanguageContext";
import SelectLangSwitcher from "../context/SelectLangSwitcher";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { TopMenus } from "./TopMenus";
import { BsSearch } from "react-icons/bs";
import { LuUserRound } from "react-icons/lu";

export default function Header() {
    const { translations, language } = useLanguage();
    useEffect(() => {
        const toggleButton = document.getElementById('toggleButton');
        const cardContainer = document.getElementById('cardContainer');
        const closeButton = document.getElementById('closeButton');

        toggleButton.addEventListener('click', () => {
            cardContainer.style.width = cardContainer.style.width === '350px' ? '0' : '350px';
        });

        closeButton.addEventListener('click', () => {
            cardContainer.style.width = '0';
        });
    }, [])
    return <>
        {/* <div style={{ backgroundColor: 'rgb(230, 161, 50)' }} >
            <p className="text-center">
                {translations.trial}
            </p>
        </div> */}
        <nav
            className="w-full h-auto lg:px-12 xl:px-22 2xl:px-52 md:px-24 sm:px-16 px-4 py-2 bg-[#363636] backdrop-blur-md shadow flex items-center justify-between flex-auto flex-grow-0 flex-shrink-0">

            <button id="toggleButton" className="hover:bg-indigo-500 lg:hidden text-white cursor-pointer rounded">
                <HiMenu size={32}/>
            </button>

            <Link className="flex" href={`/${language}`}>
                <img src="/static/media/theme/logoTop.png" alt="eslahi" className="h-[48px] hidden md:block" />
            </Link>

            <TopMenus/>

            <div className="flex gap-1 md:gap-4 items-center">

                <Link href={`/${language}/books`}
                    className="bg-white text-[#363636] hover:bg-[#DBA100] hover:text-white py-2 px-2 rounded flex items-center transition duration-300">
                    <BsSearch size={22}/>
                </Link>

                <span className="border-l border-gray-400 h-[35px]"></span>

                <button
                    className="bg-white login-icon text-[#363636] hover:bg-[#DBA100] hover:text-white  py-2 px-3 rounded flex items-center transition duration-300">
                    <LuUserRound size={22}/>
                    <span className="hidden lg:inline-block text-normal ms-1" style={{ lineHeight: 1 }}>{translations.login_register}</span>
                </button>

                <SelectLangSwitcher />
            </div>
        </nav>


        <div id="cardContainer"
            className="fixed top-0 right-0 h-full w-0 overflow-hidden bg-black bg-opacity-75 backdrop-blur-lg shadow-lg transition-all duration-300"
            style={{ width: 0, zIndex: 500 }}
        >

            <button id="closeButton" className="text-red-500 absolute top-6 right-6 z-30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <div className="w-full h-full px-8 py-16 relative">
                <div className="w-full h-auto flex flex-col gap-y-1 mt-6">
                    <Link href={`/${language}`}
                        className="w-full h-auto flex items-center gap-x-4 text-gray-200 hover:text-gray-100 hover:bg-indigo-600 rounded-md px-4 py-3 ease-out duration-500 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-layout-dashboard">
                            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                        </svg>
                        <h1 className="text-base font-medium">{translations.home}</h1>
                    </Link>
                    <Link href={`/${language}/books`}
                        className="w-full h-auto flex items-center gap-x-4 text-gray-200 hover:text-gray-100 hover:bg-indigo-600 rounded-md px-4 py-3 ease-out duration-500 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-sliders-horizontal">
                            <line x1="21" x2="14" y1="4" y2="4"></line>
                            <line x1="10" x2="3" y1="4" y2="4"></line>
                            <line x1="21" x2="12" y1="12" y2="12"></line>
                            <line x1="8" x2="3" y1="12" y2="12"></line>
                            <line x1="21" x2="16" y1="20" y2="20"></line>
                            <line x1="12" x2="3" y1="20" y2="20"></line>
                            <line x1="14" x2="14" y1="2" y2="6"></line>
                            <line x1="8" x2="8" y1="10" y2="14"></line>
                            <line x1="16" x2="16" y1="18" y2="22"></line>
                        </svg>
                        <h1 className="text-base font-medium">{translations.book_list}</h1>
                    </Link>
                    <Link href={`/${language}/authors`}
                        className="w-full h-auto flex items-center gap-x-4 text-gray-200 hover:text-gray-100 hover:bg-indigo-600 rounded-md px-4 py-3 ease-out duration-500 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-square-user">
                            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                            <circle cx="12" cy="10" r="3"></circle>
                            <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        <h1 className="text-base font-medium">{translations.authors}</h1>
                    </Link>
                </div>
                <div
                    className="absolute bottom-6 left-0 px-8 w-full h-auto text-center border-t border-gray-800 pt-6 text-gray-600 text-sm font-thin">
                    Copyright © 2024. All rights reserved.
                </div>
            </div>
        </div>
    </>
}