import { useLanguage } from "@/components/context/LanguageContext"
import appConfig from "@/config/appConfig"
import { useConfig } from "@/utils/config"
import useData from "@/utils/useData"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HeroSection() {
    const { translations, language } = useLanguage();
    const { defaultLogo, mediaPath } = useConfig()
    const { get, post } = useData()
    const [data, setData] = useState();
    const [word, setWord] = useState(null);
    let selectedIndex = -1;
    const router = useRouter();

    const fetchData = (e) => {

        let search = e.target.value
        if (search?.length < 3) {
            return
        }
        setWord(search)
        
        $('.result-box, .layer-search-box').removeClass('hidden')
        
        if (e.keyCode == 13) {
            go_to_books()
            return
        }

        if (e.keyCode > 36 && e.keyCode < 41) {
            const searchResults = document.querySelector('.result-box')

            if (searchResults == null) return

            const resultItems = Array.from(searchResults.getElementsByTagName('li'));

            if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                selectedIndex = Math.min(resultItems.length - 1, selectedIndex + 1);
                updateSelection();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                selectedIndex = Math.max(0, selectedIndex - 1);
                updateSelection();
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                const selectedItem = resultItems[selectedIndex];
                selectedItem.children[0].click();
            }

            function updateSelection() {
                resultItems.forEach((item, index) => {
                    item.classList.remove('selected');
                    if (index === selectedIndex) {
                        item.classList.add('selected');
                        scrollToItem(item);
                        $('#search-item').val($(item).text())
                    }
                });
            }
            function scrollToItem(item) {
                const parent = searchResults;
                const itemRect = item.getBoundingClientRect();
                const parentRect = parent.getBoundingClientRect();

                if (itemRect.bottom > parentRect.bottom) {
                    parent.scrollTop += itemRect.bottom - parentRect.bottom + 40;
                }
                else if (itemRect.top < parentRect.top) {
                    parent.scrollTop -= parentRect.top - itemRect.top + 40;
                }
            }
            return
        }

        selectedIndex = -1;
        setData(null)
        get(`/api/v1.0/BookSearch/BookAutoComplete?phrase=${search}&count=10`, setData)
        axios.post(`${appConfig.apiBaseUrl}/api/logs/setUserSearch`, {
            "q": search
        })
    }

    const go_to_books = () => {
        if (word) {
            let target = `/${language}/books?sort_by=1&limit=[]&offset=1&count=12&sortType=1&q=${word}&idx=["All"]`
            router.push(target)
        }
    }

    return <>
        <section style={{ backgroundImage: "url('/static/media/theme/BG-slider-2.jpg')", paddingBottom: '10rem' }}
            className="relative hero-section w-full h-auto lg:px-12 xl:px-22 2xl:px-52 md:px-24 sm:px-16 px-4 py-12 md:pb-28">
            <div className="fixed top-0 right-0 bottom-0 left-0 cursor-pointer z-10 layer-search-box hidden" onClick={() => $('.result-box, .layer-search-box').addClass('hidden')}></div>
            <img className="absolute top-0 left-0 w-full h-full" src="/static/media/theme/Group 31452.png" alt="" />
            <div className="relative flex flex-col mx-auto md:block md:flex-col md:py-12 sm:max-w-xl md:max-w-full">
                <div
                    className="z-0 hidden md:flex justify-center top-13 h-full md:pb-16 md:pr-8 md:w-1/2 md:absolute md:justify-end md:bottom-0 md:left-0 md:items-center" style={{ top: '3.5rem' }}>
                    <img src="/static/media/theme/1.png" alt=""
                        className="object-cover object-right sm:w-[70%] md:w-[60%] lg:w-[96%]" />
                </div>
                <div className="relative flex justify-start max-w-xl md:max-w-screen-xl">
                    <div className="mb-16 w-full md:max-w-md md:mb-0">
                        <div className="max-w-xl px-4 ps-1">
                            <div className="flex flex-col items-center sm:items-end sm:flex-row">
                                <img src="/static/media/theme/title.png" alt="" className="w-full mb-3" />
                            </div>

                        </div>
                        <div className="relative flex flex-col md:flex-row w-full">
                            <input id="search-item" required="" type="text" placeholder={translations.search}
                                onKeyUp={(event) => fetchData(event)}
                                className="w-full z-20 h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline" />
                            <svg onClick={go_to_books} className="absolute z-20 left-2 top-2" width="34" height="33" viewBox="0 0 34 33" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M32.885 30.495L23.485 21.088C25.5044 18.5656 26.4802 15.3651 26.2116 12.1451C25.943 8.92513 24.4503 5.93058 22.0408 3.77769C19.6314 1.62481 16.4883 0.477359 13.2585 0.571464C10.0287 0.665568 6.95781 1.99407 4.67776 4.28359C2.39772 6.57311 1.08197 9.64948 1.00126 12.8797C0.92055 16.1098 2.08102 19.2481 4.24388 21.6486C6.40674 24.0491 9.40745 25.5293 12.6285 25.7846C15.8496 26.0399 19.046 25.0509 21.56 23.021L30.951 32.428L32.885 30.495ZM5.65902 21.195C3.81159 19.35 2.66106 16.9215 2.40347 14.3233C2.14589 11.7252 2.79718 9.11803 4.24638 6.94622C5.69559 4.77441 7.85302 3.17231 10.3511 2.41289C12.8491 1.65348 15.5332 1.78375 17.9459 2.78151C20.3587 3.77927 22.3509 5.58277 23.5829 7.88471C24.815 10.1867 25.2107 12.8446 24.7028 15.4056C24.1948 17.9667 22.8145 20.2723 20.7971 21.9297C18.7796 23.5871 16.2499 24.4937 13.639 24.495C12.1569 24.4995 10.6886 24.2103 9.31888 23.6441C7.94918 23.0778 6.70527 22.2448 5.65902 21.195Z"
                                    fill="#4B4B4B" stroke="#4B4B4B" strokeWidth="0.5">
                                </path>
                            </svg>
                            {
                                data ? data.length > 0 ? <ul className="result-box absolute mx-auto top-14 left-0 right-0 h-44 w-full  overflow-auto z-50 bg-white border border-blue-300 shadow rounded-md p-4">
                                    {
                                        data.map(item => {
                                            return <li className="mb-2">
                                                <Link href={`/${language}/books?sort_by=1&limit=[]&offset=1&count=12&sortType=1&q=${item.replace(/<[^>]*>/g, "")}&idx=["All"]`} className="line-clamp-1" herf="#" dangerouslySetInnerHTML={{ __html: item }}>

                                                </Link>
                                                <hr className="w-8/12 mx-auto my-2" />
                                            </li>
                                        })
                                    }

                                </ul>
                                    :
                                    <ul className="result-box absolute mx-auto top-14 left-0 right-0 h-44 w-full overflow-auto z-50 bg-white border border-blue-300 shadow rounded-md p-4">
                                        {
                                            word.length > 0 ? <li className="absolute w-full mx-auto px-2 bg-white right-0">
                                                <p className="w-full mx-auto text-center">
                                                    {/* {translations.no_item_found} */}
                                                </p>
                                            </li>
                                                :
                                                <li className="absolute w-full mx-auto px-2 bg-white right-0">
                                                    <p className="w-full text-center mx-auto">
                                                        {/* {translations.what_looking_for} */}
                                                    </p>
                                                </li>
                                        }
                                    </ul>
                                    :
                                    word && <ul className="result-box absolute mx-auto top-14 left-0 right-0 h-44 w-full overflow-auto z-50 bg-white border border-blue-300 shadow rounded-md p-4">
                                        <li className="absolute w-full mx-auto px-2 bg-white right-0">
                                            <div className="w-full mx-auto">
                                                <div className="animate-pulse flex space-x-4">
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="grid grid-cols-5 gap-4">
                                                            <div className="h-4 bg-slate-200 rounded col-span-5"></div>
                                                            <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                                                            <div className="h-4 bg-slate-200 rounded col-span-4"></div>
                                                            <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                                                            <div className="h-4 bg-slate-200 rounded col-span-5"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                            }
                        </div>
                        <div className="flex items-center mt-4 sm-between">
                            <button
                                className="active inline-flex items-center justify-center cursor-pointer hover:bg-[#DBA100] hover:text-white hover:rounded-t-none btn-padding font-medium tracking-wide text-[#232323] transition duration-200 rounded shadow-md bg-[#F6F6F6] focus:shadow-outline focus:outline-none">
                                {translations.all_cases}
                            </button>
                            <button
                                className="inline-flex items-center justify-center cursor-pointer hover:bg-[#DBA100] hover:text-white hover:rounded-t-none btn-padding mx-2 font-medium tracking-wide text-[#232323] transition duration-200 rounded shadow-md bg-[#F6F6F6] focus:shadow-outline focus:outline-none">
                                {translations.book_name}
                            </button>
                            <button
                                className="inline-flex items-center justify-center cursor-pointer hover:bg-[#DBA100] hover:text-white hover:rounded-t-none btn-padding font-medium tracking-wide text-[#232323] transition duration-200 rounded shadow-md bg-[#F6F6F6] focus:shadow-outline focus:outline-none">
                                {translations.authors}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}