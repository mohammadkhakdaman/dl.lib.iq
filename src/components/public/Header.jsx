import Tools from "@/utils/Tools"
import useFilter from "@/utils/useFilter";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../context/LangSwitcher";
import Link from "next/link";

export function Header({ width, refetch, className }) {
    const { translations, language } = useLanguage();
    const { toggleDropdown } = Tools();
    const { simple } = useFilter();
    const searchParams = useSearchParams()
    const [word, setWord] = useState(searchParams.get('q'))
    let idx, idx_word;


    switch (searchParams.get('idx')) {
        case '["All"]':
            idx = 'جمیع الحقول'
            idx_word = translations.all_fields
            break;
        case '["Text"]':
            idx = 'متن'
            idx_word = translations.text
            break;
        case '["Title"]':
            idx = 'العنوان'
            idx_word = translations.title
            break;
        case '["Subject"]':
            idx = 'الموضوع'
            idx_word = translations.topic
            break;
        case '["Author"]':
            idx = 'المولف'
            idx_word = translations.author
            break;
        case '["Language"]':
            idx = 'اللغه'
            idx_word = translations.the_language
            break;
        case '["Publisher"]':
            idx = 'الناشر'
            idx_word = translations.publisher
            break;

        default:
            idx = 'جمیع الحقول'
            idx_word = translations.all_fields
            break;
    }

    const sortType = (type) => {
        toggleDropdown('menu-button')
        if (word === '') {
            simple('idx', `["${type}"]`, null, 'no-fetch')
            return
        }
        simple('idx', `["${type}"]`, refetch)
    }

    const search = () => {
        if (word == '') {
            alert(translations.what_looking_for)
            return
        }
        simple('q', word, refetch)
    }

    return <>
        {/* <div className="w-full fixed z-10" style={{ backgroundColor: 'rgb(230, 161, 50)' }} >
            <p className="text-center">
                {translations.trial}
            </p>
        </div> */}
        <header
            className={`flex w-full flex-wrap items-center justify-center h-auto static ${className || ''}`}>
            {/* className="flex w-full flex-wrap items-center justify-center p-3 h-auto bg-[#289ccb] static w-100" style={{ width: `calc(100% - ${width})` }}> */}
            {/* <LanguageSwitcher /> */}
            <div className="rtl flex w-full items-center relative">
                <input
                    type="search"
                    className="relative m-0 block w-[1px] min-w-0 flex-auto bg-white rounded bg-transparent bg-clip-padding px-3 py-2 text-base font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:bg-body-dark dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill"
                    placeholder={translations.enter_your_search}
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    defaultValue={word}
                    onKeyUp={(event) => setWord(event.target.value)}
                />

                <div className="absolute flex items-stretch text-left left-1">

                    <div className="border-l w-[1px] my-2 border-gray-300"></div>
                    <div className="total-search-cat">
                        <div className="w-[120px]" style={{ width: '120px' }}>
                            <button type="button" style={{ justifyContent: 'space-around' }}
                             className="flex justify-around  w-full gap-x-1.5 bg-white px-3 py-2 text-sm text-teal-600 hover:bg-gray-50" onClick={() => toggleDropdown('menu-button')} id="menu-button">
                                {idx_word}
                                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="absolute hidden text-right right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="dropdown" aria-labelledby="menu-button">
                            <div className="py-1">
                                <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { sortType('All') }} role="menuitem" tabIndex="-1">{translations.all_fields}</span>
                                <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { sortType('Text') }} role="menuitem" tabIndex="-1">{translations.text}</span>
                                <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { sortType('Title') }} role="menuitem" tabIndex="-1">{translations.title}</span>
                                <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { sortType('Subject') }} role="menuitem" tabIndex="-1">{translations.topic}</span>
                                <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { sortType('Author') }} role="menuitem" tabIndex="-1">{translations.author}</span>
                                <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { sortType('Language') }} role="menuitem" tabIndex="-1">{translations.the_language}</span>
                                <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { sortType('Publisher') }} role="menuitem" tabIndex="-1">{translations.publisher}</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => search()} type="button" 
                    className="flex px-3 my-1 items-center justify-center bg-teal-600 text-white rounded text-sm font-semibold hover:bg-teal-700">
                        جستجو
                    </button>

                    {/* <Link href={`/${language}/search`} type="button" className="flex p-3 items-center justify-center mr-1 rounded-3xl bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <i className="fa fa-cog"></i>
                    </Link> */}
                </div>
            </div>
        </header>
    </>
}

