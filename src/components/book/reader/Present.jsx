import { useEffect, useState } from "react";
import Header from "./Header";
import Pages from "./Pages";
import { useParams } from "next/navigation";
import useData from "@/utils/useData";
export default function Present({ info, toggleMenu }) {
    const [data, setData] = useState()
    const { post } = useData()
    const params = useParams();
    const [viewType, setViewType] = useState();

    useEffect(() => {
        fetchData(params.page)
    }, [])

    const toggleLoading = (show) => {
        $('.refetch-loading').toggleClass('hidden', !show).toggleClass('flex', show);
    };
    
    const fetchData = async (page) => {
        try {
            console.log('fetchingData in Present:', info);
    
            const newViewType = info?.has_text ? 'txt' : info?.has_pdf ? 'img' : null;
            setViewType(newViewType);
    
            if (!newViewType) return;
    
            toggleLoading(true);
    
            if (newViewType === 'txt') {
                await post('https://api.lib.iq/api/book/getBookPageContent', {
                    language: "en",
                    bookId: params?.book_id,
                    viewType: newViewType,
                    pageNumber: page
                }, setData);
            } else {
                setData(params.page);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            toggleLoading(false);
        }
    };
    
  
    return <>
        <div className="present-sec reader-container absolute bg-white border border-gray-100 shadow-md shadow-black/5 rounded-md">
            <Header info={info} refetch={fetchData} toggleMenu={toggleMenu} viewType={viewType} setViewType={setViewType} />
            <div className="present p4 text-center page z-50">
                <Pages refetch={fetchData} pages={data} PageCount={info?.page_count} viewType={viewType} key={Math.random()} />
            </div>
        </div>
    </>
}