'use client'
import Tools from "@/utils/Tools";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Loading from "@/components/ui/Loading";
import { SubjectService } from "@/service/SubjectService";
import Pagination from "@/components/ui/Pagination";
import AuthoritiesGrid from "./components/AuthoritiesGrid";
import Sidebar from "./components/Sidebar";
import { useQueryFilters } from "@/utils/hooks/useQueryFilters";
import { useLanguage } from "@/components/context/LanguageContext";

const defaultFilters = {
    sortItem: 1, 
    offset: 0, 
    count: 12, 
    sortType: 0,
    q: "", 
    authorityType: "Subject"
}

export default function Books() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([])
    const { translations } = useLanguage();
    const [keyword, setKeyword] = useState('');

    const fetchData = async (data) => {
        setLoading(true);
        const res = await SubjectService.search(data);
        setLoading(false);
        if(res.success){
            setItems(res);
        }
    }

    const {filters, updateFilters} = useQueryFilters(defaultFilters, fetchData);
    
    const handleSearch = useCallback(() => {
        updateFilters({q: keyword});
    });

    const onPageChange = useCallback((page) => {
        updateFilters({offset: (page - 1) * filters.count});
    }, []);

    return (
        <MainLayout className={'bg-[#eeeded]'} setHeadBackground={true} contentClassName={'px-8 xl:px-36'}>
            <div className="w-full flex mt-4 mb-4 relative">
                <input
                    type="search"
                    className="bg-white w-full rounded px-3 py-1 h-10 text-normal font-normal focus:outline-primary focus:text-gray-700 placeholder:text-sm"
                    placeholder={translations.enter_your_search}
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    defaultValue={filters.q}
                    onChange={(event) => setKeyword(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch} className="absolute left-1 top-1 bottom-1 px-5 bg-teal-600 text-white rounded text-sm font-semibold hover:bg-teal-700">
                    جستجو
                </button>
            </div>
            <Loading loading={loading} type="cover" className='mt-4 flex flex-row items-start gap-3' coverClass='rounded-lg'>
                {/* <Sidebar authors={items?.data || []}/> */}
                <div className="bg-white rounded-lg self-stretch flex-grow flex flex-col">
                    <AuthoritiesGrid items={items?.data || []} />
                    <Pagination 
                        total={items?.size} 
                        currentPage={filters.offset / 12 + 1} 
                        pageSize={filters.count} 
                        className={'self-center my-4 fu-num text-normal'}
                        onChange={onPageChange}
                    />
                </div>
            </Loading>
        </MainLayout >
    )
}