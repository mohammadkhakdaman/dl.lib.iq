'use client'
import CardGrid from "@/components/card/CardGrid";
import CardList from "@/components/card/CardList";
import CardListContainer from "@/components/card/CardListCntainer";
import MainLayout from "@/components/layout/MainLayout";
import useData from "@/utils/useData";
import { useEffect, useState } from "react";
import Nav from "@/components/public/nav";
import { usePathname, useSearchParams } from "next/navigation";
import Tools from "@/utils/Tools";
import Link from "next/link";
import SimpleModal from "@/components/SimpleModal";
import { useLanguage } from "@/components/context/LanguageContext";
import Loading from '@/components/ui/Loading'
import {BookListItem, ResultsPanelHeader, SearchBar, Sidebar, BookInfoDialog} from './components'
import useDialogObject from '@/utils/hooks/useDialogObject'
import { BookService } from "@/service/BookService";
import Pagination from "@/components/ui/Pagination";
import useFilter from "@/utils/useFilter";

const defaultData = { 
    sort_by: 1, 
    limit: [], 
    offset: 1, 
    count: 10, 
    sortType: 1, 
    q: "", 
    idx: ["All"]
};

export default function Books() {

    const { translations, language } = useLanguage();
    const pathname = usePathname()
    const [items, setItems] = useState([])
    const bookInfoDialog = useDialogObject();
    const [loading, setLoading] = useState(true);
    const { convertSearchParamsToDesiredFormat } = Tools();
    const searchParams = useSearchParams();
    const { simple } = useFilter();
    var offset = searchParams.get('offset') || defaultData.offset;
    var pageSize = searchParams.get('count') || defaultData.count;

    const [display, setDisplay] = useState('list')
    //const {post} = useData();

    useEffect(() => {

        window.$ = window.jQuery = require('jquery')
        var jsSearchParams = new URLSearchParams(window.location.search);

        let data;
        if (Array.from(jsSearchParams).length > 0) {
            data = convertSearchParamsToDesiredFormat(jsSearchParams);
        } else {
            data = defaultData;
            const queryString = Object.entries(defaultData)
            .map(([key, value]) => `${key}=${typeof value === 'string' ? value : JSON.stringify(value)}`)
            .join('&');

            var newRelativePathQuery = pathname + `?${queryString}`;
            window.history.pushState({}, "", newRelativePathQuery);
        }
        fetchData(data)
    }, [])

    const setPage = (page) => {
        simple('offset', page, fetchData);
    }

    const fetchData = async (data) => {
        setLoading(true);
        const res = await BookService.search({...defaultData, ...data});
        setLoading(false);
        if(res.status) {
            setItems(res.data);
        }
    }

    const injectModal = (book) => {
        bookInfoDialog.open(book)
    }

    const renderData = () => {
        return (
            <div className="bg-white rounded-lg flex-1 flex flex-col">
                <div className="rtl px-3 py-1"> 
                    <ResultsPanelHeader refetch={fetchData} filterItems={Object.keys(items?.facetList || {})} className={''} setDisplay={setDisplay} count={items?.count} duration={items?.duration} key={'nav-bar'} />
                    <CardListContainer display={display}>
                        {
                            items?.resultList?.length > 0 ? items.resultList.map((item, index) => {
                                return <BookListItem item={item} injectModal={injectModal} key={item.bookId} />
                            })
                                :
                                <div className="flex justify-center">
                                    <h4 className="text-center">
                                        {translations.no_item_found}
                                    </h4>
                                </div>
                        }
                    </CardListContainer>
                </div>
                <Pagination total={items?.count || 0} onChange={setPage} currentPage={offset} pageSize={pageSize} className={'self-center my-4 fu-num'}/>
                <BookInfoDialog {...bookInfoDialog} />
            </div>
        )
    }

    return (
        <MainLayout setHeadBackground={true}>
            <SearchBar className={'bg-transparent border-none shadow-none px-36'}  refetch={fetchData} width={0} key={Math.random()}/>
            <div className="px-36 mt-2 flex flex-row items-start gap-3">
            { loading || <Sidebar refetch={fetchData} sideData={items?.facetList}/> }
            {
                loading ? 
                    <div className="bg-white rounded-lg flex-1 min-h-72 flex items-center justify-center">
                        <Loading loading={true}/>
                    </div> :
                    renderData()
            }
            </div>
        </MainLayout>
    )
}