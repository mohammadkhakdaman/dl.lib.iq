'use client'
import AuthorCard from "@/components/card/AuthorCard";
import CardListContainer from "@/components/card/CardListCntainer";
import MainLayout from "@/components/layout/MainLayout";
import Tools from "@/utils/Tools";
import useData from "@/utils/useData";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Nav from "@/components/public/nav";
import { useLanguage } from "@/components/context/LanguageContext";
import appConfig from "@/config/appConfig";
import Sidebar from "./components/Sidebar";
import Loading from "@/components/ui/Loading";
import { AuthorService } from "@/service/AuthorService";
import AuthorsGrid from "./components/AuthorsGrid";
import Pagination from "@/components/ui/Pagination";
import { useQueryFilters } from "@/utils/hooks/useQueryFilters";

const defaultFilters = { 
    sortItem: 1, 
    offset: 0, 
    count: 12, 
    sortType: 0, 
    q: "", 
    authorityType: "Author" 
}

export default function Authors() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const {translations} = useLanguage();
    const [keyword, setKeyword] = useState('');


    const fetchData = async (data) => {
        setLoading(true);
        AuthorService.search(data).then((res) => {
            setItems(res)
            setLoading(false)
        });
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
            <Loading loading={loading} type="cover" className='className="mt-2 flex flex-row items-start gap-3' coverClass='rounded-lg'>
                {/* <Sidebar authors={items?.data || []}/> */}
                <div className="bg-white rounded-lg self-stretch flex-grow flex flex-col">
                    <AuthorsGrid items={items?.data || []} />
                    <Pagination 
                        total={items?.size} 
                        currentPage={Math.floor(filters.offset / filters.count) + 1} 
                        pageSize={filters.count} 
                        className={'self-center my-4 fu-num text-normal'}
                        onChange={onPageChange}
                    />
                </div>
            </Loading>
       </MainLayout>
    )

    // return <>
    //     <MainLayout>
    //         <div className="p-4 rtl">
    //             <Nav refetch={fetchData} setDisplay={setDisplay} count={items?.count} duration={items?.duration} key={'nav-bar'} />
    //             <CardListContainer display={display}>
    //                 {
    //                     // items?.resultList?.length > 0 ? items.resultList.map(item => {
    //                     items?.length > 0 ? items.map(item => {
    //                         return display == 'grid' ? <AuthorCard item={item} /> : <AuthorCard item={item} />
    //                     })
    //                         :
    //                         <div className="flex justify-center">
    //                             <h4 className="text-center">
    //                                 {translations.no_item_found}
    //                             </h4>
    //                         </div>
    //                 }
    //             </CardListContainer>
    //         </div>
    //         <Pagination key={Math.random()} count={items?.count} perPage={12} offset={offset} refetch={fetchData} />
    //     </MainLayout>
    // </>
}