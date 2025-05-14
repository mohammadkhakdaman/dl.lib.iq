'use client'
import Tools from "@/utils/Tools";
import useFilter from "@/utils/useFilter";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/context/LanguageContext";
import { useCallback } from "react";
import { SideItems } from "./Sidebar";
import { IoMdClose } from 'react-icons/io'

export default function ResultsPanelHeader({ refetch, filterItems, setDisplay, count = 0, className, duration = ' - ' }) {

    const { translations } = useLanguage();
    const { simple, remove_filter } = useFilter()
    const searchParams = useSearchParams()
    
    const limit = JSON.parse(searchParams.get('limit'));
    const onSortChange = useCallback((newSortBy) => {
        simple('sort_by', newSortBy, refetch);
    }, [simple, refetch])

    const removeFilter = useCallback((type, value) => {
        remove_filter('limit', refetch, type, value);
    }, [remove_filter, refetch])


    return (
        <div className="flex justify-between text-sm p-2 items-center">
            <div className="flex gap-2 flex-1">
            {
                limit?.map(item => {
                    const filter = SideItems[item.type];
                    if(!filter) return null;
                    return (
                        <FilterItem title={translations[filter.titleKey]} value={item.value} type={item.type} onRemove={removeFilter} key={item.type}/>
                    )
                })
            }
            </div>

            <div>
                <span className="text-teal-600">{translations.result_count}: </span>
                <span className="fu-num">{count}</span>
            </div>
        </div>
    );

    // return <nav
    //     className={`flex w-full flex-wrap items-center justify-between ${className || ''}`}>
    //     <div className="w-full rounded-b text-gray-700 mb-5" role="alert">
    //         <div className="flex items-start">
    //             <div className="self-start">
    //                 <i className="fa fa-search me-1"></i>
    //             </div>
    //             <div>
    //                 <p className="flex items-center text-sm">{translations.show_result_for} : <span className="font-bold mt" style={{ marginTop: '1px' }}> &nbsp; {count.toLocaleString()} </span> <span style={{ marginTop: '1px' }}> &nbsp;{translations.reslut} 
    //                         {/* ({duration} ثانية) */}
    //                         </span>
    //                     {
    //                         searchParams.get('q') != '' && searchParams.get('q') != '*' && searchParams.get('q') != null && isNaN(searchParams.get('q')) && <button class="mx-1 group relative inline-flex items-center justify-center rounded-full bg-[#aeb4ba] py-1 pl-6 pr-8 font-medium text-neutral-50">
    //                             <span class="z-10 pr-2 line-clamp-1">{searchParams.get('q')}</span>
    //                             <div onClick={() => remove_filter('q', refetch)} class="absolute right-1 inline-flex h-6 w-6 items-center justify-end rounded-full bg-[#ee3d3d] transition-[width] group-hover:w-[calc(100%-8px)]">
    //                                 <div class="flex items-center justify-center w-full">
    //                                     <i class="fa fa-times absolute right-3" style={{ marginInlineStart: '-5px' }}></i>
    //                                 </div>
    //                             </div>
    //                         </button>
    //                     }
    //                 </p>
    //                 <p>
    //                     {
    //                         limit?.length > 0 && limit.map(item => {
    //                             return <button class="mx-1 my-2 group relative inline-flex items-center justify-center rounded-full bg-[#aeb4ba] py-1 pl-6 pr-8 font-medium text-neutral-50">
    //                                 <span class="z-10 pr-2 line-clamp-1">{item.value}</span>
    //                                 <div onClick={() => remove_filter('limit', refetch, item.type, item.value)} class="absolute right-1 inline-flex h-8 w-8 items-center justify-end rounded-full bg-[#ee3d3d] transition-[width] group-hover:w-[calc(100%-8px)]">
    //                                     <div class="flex items-center justify-center w-full">
    //                                         <i class="fa fa-times absolute right-3" style={{ marginInlineStart: '-2px' }}></i>
    //                                     </div>
    //                                 </div>
    //                             </button>
    //                         })
    //                     }
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    //     {/* <SortDropdown currentSortBy={searchParams.get('sort_by')} onChange={onSortChange}/> */}
    //     {/* <div className="flex justify-between w-[40px] toggle-view">
    //         <i className="fa fa-list hover:scale-110 hover:text-blue-800 transition cursor-pointer" onClick={() => setDisplay('list')}></i>
    //         <i className="fa fa-th hover:scale-110 hover:text-blue-800 transition cursor-pointer" onClick={() => setDisplay('grid')}></i>
    //     </div> */}
    // </nav>
}

const Sorts = {
    '1': {
        sortWith: 'الصلة',
        key: 'relevance'
    },
    '2': {
        sortWith: 'تاريخ التسجيل',
        key: 'registration_date'
    },
    '3': {
        sortWith: 'تاريخ النشر',
        key: 'publication_date'
    },
    '4': {
        sortWith: 'العنوان',
        key: 'title'
    },
}

const SortDropdown = ({currentSortBy, onChange}) => {
    const { translations } = useLanguage();
    const { toggleDropdown } = Tools();

    const sortBy = Sorts[currentSortBy];
    return (
        <div className="relative">
            <div className="flex items-center">
                <span>{translations.arrangement}: </span>
                <button type="button" className="inline-flex ms-3  w-full justify-center gap-x-1.5 rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => toggleDropdown('menu-sort')} id="menu-button">
                    <span>{translations[sortBy.key]}</span>
                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="absolute hidden text-right right-20 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="dropdown" aria-labelledby="menu-sort">
                <div className="py-1" role="none">
                    <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { toggleDropdown('menu-sort'); onChange(1) }} role="menuitem" tabIndex="-1" id="menu-item-2">{translations.relevance}</span>
                    <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { toggleDropdown('menu-sort'); onChange(2) }} role="menuitem" tabIndex="-1" id="menu-item-0"> {translations.registration_date}</span>
                    <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { toggleDropdown('menu-sort'); onChange(3) }} role="menuitem" tabIndex="-1" id="menu-item-1"> {translations.publication_date}</span>
                    <span className="block rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 hover:scale-90" onClick={() => { toggleDropdown('menu-sort'); onChange(4) }} role="menuitem" tabIndex="-1" id="menu-item-2">{translations.title}</span>
                </div>
            </div>
        </div>
    )
}

const FilterItem = ({title, value, type, onRemove}) => {
    const onRemoveClick = useCallback(() => {
        onRemove(type, value)
    }, [value, type])

    return (
        <div className="flex items-center gap-1">
            <span className="text-gray-600">{title}:</span>
            <div className="border px-2 py-1 rounded ">
                <span>{value}</span>
                <IoMdClose className="inline-block cursor-pointer hover: text-red-950" onClick={onRemoveClick}/>
            </div>
        </div>
    )
}