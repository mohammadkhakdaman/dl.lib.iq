import React, { useCallback, useMemo, useRef, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';

const AuthorsSidebarContent = ({ authors, onItemClick }) => {
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
        return authors.filter(x => x.key.includes(finalKeyword));
    }, [authors, finalKeyword])

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
                    <SideAuthorItem key={i} item={item} onClick={onItemClick}/>
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

const SideAuthorItem = ({item, onClick}) => {
    const onItemClick = useCallback((event) => {
        onClick?.(item)
    }, [item]);
    return (
        <div className="text-gray-700 flex justify-between items-center py-1.5 mx-1 px-3 border-b border-dotted border-gray-400">
            <div className="cursor-pointer" onClick={onItemClick}>
                <span className="title w-11/12 hover:text-blue-600 hover:scale-95 transition-all duration-150">{item.key}</span>
            </div>
            <span className="fu-num">{item.doc_count}</span>
        </div>
    )
}

export default AuthorsSidebarContent;