import { useLanguage } from "@/components/context/LanguageContext"
import { useConfig } from "@/utils/config"
import useData from "@/utils/useData"
import Link from "next/link"
import { useState } from "react"

export default function Hero() {
    const { translations, language } = useLanguage();
    const { defaultLogo, mediaPath } = useConfig()
    const { get } = useData()
    const [data, setData] = useState();
    const [word, setWord] = useState(null);
    let selectedIndex = -1;

    const fetchData = (e) => {

        $('.result-box, .layer-search-box').removeClass('hidden')

        if (e.keyCode > 36 && e.keyCode < 41 || e.keyCode == 13) {
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
        let search = e.target.value
        setData(null)
        setWord(search)
        get(`/api/v1.0/BookSearch/BookAutoComplete?phrase=${search}&count=10`, setData)
    }


    return <>
        <div className="h-[500px] sm:h-[300px] md:h-[500px] w-full bg-slate-500 relative rtl" style={{ backgroundImage: `url("${mediaPath}/theme/carousel-1.jpg")` }}>
            <div className="layer h-full bg-[rgba(255,255,255,0)]">
                <div className="flex flex-wrap justify-center sm:max-w-[320px] md:max-w-[500px] mx-auto h-full content-center">
                    <img src={defaultLogo} className="mb-5" alt="" />
                    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-55 z-10 layer-search-box hidden" onClick={() => $('.result-box, .layer-search-box').addClass('hidden')}></div>
                    <div className="mt-5 w-full relative z-20">
                        <input type="text" onKeyUp={(event) => fetchData(event)} className="border border-blue-300 w-full py-2 px-4 rounded-full" placeholder={translations.enter_your_search} />
                        {
                            data ? data.length > 0 ? <ul className="result-box absolute mx-auto left-0 right-0 h-44 w-11/12  overflow-auto z-50 bg-white border border-blue-300 shadow rounded-md p-4">
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
                                <ul className="result-box absolute mx-auto left-0 right-0 h-44 w-11/12 overflow-auto z-50 bg-white border border-blue-300 shadow rounded-md p-4">
                                    {
                                        word.length > 0 ? <li className="absolute w-full mx-auto px-2 bg-white right-0">
                                            <p className="w-full mx-auto text-center">
                                                {translations.no_item_found}
                                            </p>
                                        </li>
                                            :
                                            <li className="absolute w-full mx-auto px-2 bg-white right-0">
                                                <p className="w-full text-center mx-auto">
                                                    {translations.what_looking_for}
                                                </p>
                                            </li>
                                    }
                                </ul>
                                :
                                word && <ul className="result-box absolute mx-auto left-0 right-0 h-44 w-11/12 overflow-auto z-50 bg-white border border-blue-300 shadow rounded-md p-4">
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
                    <div className="mt-5 w-full flex justify-center">
                        <button className="mx-1 group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-[#aeb4ba] py-1 pl-6 pr-14 font-medium text-neutral-50">
                            <span className="z-10 pr-2">{translations.research}</span>
                            <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-[#289ccb] transition-[width] group-hover:w-[calc(100%-8px)]">
                                <div className="flex items-center justify-center w-full">
                                    <i className="fa fa-search absolute ms-1 right-3"></i>
                                </div>
                            </div>
                        </button>
                        <Link href={`/${language}/search`} className="mx-1 group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-[#aeb4ba] py-1 pl-6 pr-14 font-medium text-neutral-50">
                            <span className="z-10 pr-2">{translations.advanced_search}</span>
                            <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-[#289ccb] transition-[width] group-hover:w-[calc(100%-8px)]">
                                <div className="flex items-center justify-center w-full">
                                    <i className="fa fa-cog absolute ms-1 right-3"></i>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    </>
}