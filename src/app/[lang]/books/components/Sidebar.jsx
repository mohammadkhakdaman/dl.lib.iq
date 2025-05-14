import useFilter from "@/utils/useFilter"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/context/LanguageContext"
import SidebarBox from '@/components/public/SidebarBox'
import {FiEdit} from 'react-icons/fi'
import {BiSolidBookReader, BiSolidCollection} from'react-icons/bi'
import {FaAngleDown, FaAngleUp, FaRegFolderOpen} from'react-icons/fa6'
import {HiOutlineSearch, HiTranslate} from'react-icons/hi'
import { useCallback, useMemo, useRef, useState } from "react"
import { AdvancedSearchSidebar } from "./AdvancedSearchSidebar"

export const SideItems = {
    'author': {
        titleKey: 'authors',
        icon: <FiEdit/>
    },
    'publisher': {
        titleKey: 'publisher',
        icon: <BiSolidBookReader/>
    },
    'subject': {
        titleKey: 'topics',
        icon: <FaRegFolderOpen/>
    },
    'language': {
        titleKey: 'the_language',
        icon: <HiTranslate/>
    },
    'series': {
        titleKey: 'series',
        icon: <BiSolidCollection/>
    },
    'collections': {
        titleKey: 'series',
        icon: <BiSolidCollection/>
    }
}

const Sidebar = ({ toggleMenu, sideData, refetch }) => {
    const { arrayfilter } = useFilter()
    const pathname = usePathname()

    const { translations, language } = useLanguage();

    const filter = (type, title) => {
        arrayfilter('limit', type, title, refetch)

        // console.log('clicl', $(event.target).parent().find('.title'));

        // $(event.target).parent().find('.title').append(`<span onclick="${() => remove_filter('limit', refetch, type, title)}">
        //             <i class="text-red-600 fa fa-times></i>
        //         </span>
        //     `)
    }

    const toggleCollapse = (index) => {
        $('#subItem-' + index).toggleClass('overflow-hidden h-[200px]  h-full');
        $('#subItem-' + index).next().toggleClass('bg-blue-600').children().toggleClass('fa-chevron-circle-down fa-chevron-circle-up')
    }
    return <>
        <div className="flex flex-col overflow-auto sticky top-2 justify-start items-center bg-white rounded-lg flex-shrink-0 w-[300px] rtl" style={{ transition: "0.5s" }}>

            <ul className="w-full px-4">

                {
                    (pathname.split('/')[2] == 'authors' || pathname.split('/')[2] == 'search') && <>
                        <li>
                            <Link href={`/${language}/books`}>
                                <h2 className="text-md text-white">
                                    {translations.book_list}
                                </h2>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${language}/authorities`}>
                                <h2 className="text-md text-white">
                                    {translations.topics}
                                </h2>
                            </Link>
                        </li>
                    </>
                }
                {
                    (pathname.split('/')[2] == 'authorities') && <>
                        <li>
                            <Link href={`/${language}/books`}>
                                <h2 className="text-md text-white">
                                    {translations.book_list}
                                </h2>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${language}/authors`}>
                                <h2 className="text-md text-white">
                                    {translations.authors}
                                </h2>
                            </Link>
                        </li>
                    </>

                }
            </ul>
            <ul className="w-full p-3 ps-5">
                <AdvancedSearchSidebar className={'mb-3'} refetch={refetch}/>
                {
                    sideData && Object.keys(sideData)?.map((items, index) => {
                        const sideItem = SideItems[items];
                        return items != 'collections' && 
                        
                        <SidebarBox title={translations[sideItem.titleKey]} icon={sideItem.icon} className='mb-3' key={items}>
                            <SideDataItems items={sideData[items]} type={items} onItemClick={filter}/>
                        </SidebarBox>
                    })
                }
            </ul>
        </div>
    </>
}

const SideDataItems = ({items, type, onItemClick}) => {
    const [expanded, setExpanded] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [finalKeyword, setFinalKeyword] = useState('');
    const timeoutRef = useRef();

    const onExpandClick = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded, setExpanded])

    const onSearchKeywordChange = useCallback((e) => {
        setKeyword(e.target.value);

        if(timeoutRef.current)
            clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {setFinalKeyword(e.target.value)}, 500);
    }, [])

    const filteredItems = useMemo(() => {
        return items.filter(x => x.title.includes(finalKeyword));
    }, [items, finalKeyword])

    return (
        <div>
            <div className="bg-white rounded-lg flex flex-row items-center m-2 relative">
                <input placeholder="جستجو..." value={keyword} onChange={onSearchKeywordChange} className="border-none bg-none p-1 pl-8 pr-2 flex-1 rounded-lg outline-1"/>
                <HiOutlineSearch className="absolute left-2"/>
            </div>
        {
            filteredItems?.map((item, i) => {
                if(!expanded && i > 5) return null;
                return (
                    <SideDataItem key={i} item={item} onClick={onItemClick} type={type}/>
                )
            })
        }
        {
            finalKeyword && !filteredItems?.length && 
            <div className="p-3 text-center text-teal-600">
                موردی یافت نشد
            </div>
        }
        {
            !finalKeyword && !filteredItems?.length && 
            <div className="p-3 text-center text-teal-600">
                موردی موجود ندارد
            </div>
        }
        {
            filteredItems?.length > 6 &&
            <div className="text-center text-teal-600 py-2 cursor-pointer flex items-center justify-center gap-2" onClick={onExpandClick}>
                <span>{expanded ? 'کمتر': 'بـیشتـر'}</span>
                {expanded ? <FaAngleUp/> : <FaAngleDown/>}
            </div>
        }
        </div>
    )
}

const SideDataItem = ({item, type, onClick}) => {
    const onItemClick = useCallback((event) => {
        onClick?.(type, item.title)
    }, [item, type]);
    return (
        <div className="text-gray-700 flex justify-between items-center py-1.5 mx-1 px-3 border-b border-dotted border-gray-400">
            <div className="cursor-pointer" onClick={onItemClick}>
                <span className="title w-11/12 hover:text-blue-600 hover:scale-95 transition-all duration-150">{item.title}</span>
            </div>
            <span className="fu-num">{item.count}</span>
        </div>
    )
}

export default Sidebar