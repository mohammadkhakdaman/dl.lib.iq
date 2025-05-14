import { useParams } from "next/navigation";
import React, { useEffect, useState, Fragment, Suspense } from "react";
import { useLanguage } from "@/components/context/LanguageContext";
import axios from "axios";

export default function Pages({ pages, PageCount, viewType }) {

    const [content, setContent] = useState({})
    const [pagesNumber, setPagesNumber] = useState([])
    const [key, setKey] = useState(Math.random());
    const [fetchTime, setFetchTime] = useState(new Date().getTime());
    const { language, translations } = useLanguage()
    const params = useParams()

    useEffect(() => {
        handleScroll()
    }, [content, pagesNumber]);

    useEffect(() => {
        if (viewType == undefined && viewType == null) {
            return
        }
        if (viewType == 'txt') {
            setContent(pages)
        } else {
            setPagesNumber(Array.from({ length: 10 }, (_, index) => parseInt(pages) + index));
        }

    }, [viewType])


    let fetch = true;

    const handleScroll = () => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let current_page = $(entry.target).data('page-count')
                        $('#refPage').val($(entry.target).data('page-count'))
                        console.log('viewType', viewType);

                        if (viewType == 'img') {
                            const maxPage = Math.max(...pagesNumber);
                            const minPage = Math.min(...pagesNumber);

                            if (current_page >= maxPage - 2 && maxPage < PageCount) {
                                const newPages = Array.from({ length: 10 }, (_, index) => maxPage + index + 1);
                                setPagesNumber((prevPages) => {
                                    const allPages = [...prevPages, ...newPages];
                                    return [...new Set(allPages)];
                                });
                            }
                            return
                        }

                        if (!content || fetch == false) {
                            return
                        }


                        let maxPage = Math.max.apply(null, Object.keys(content));
                        let minPage = Math.min.apply(null, Object.keys(content));
                        let newPage;
                        // console.log("current_page", current_page, "maxPage", maxPage, "minPage", minPage, "newPage", newPage);
                        if (current_page >= maxPage - 4 && current_page < maxPage) {
                            newPage = maxPage + 1
                            if (newPage in content && newPage > PageCount && newPage < 1) {
                                return
                            }
                            setTimeout(() => {
                                fetchData(newPage)
                            }, 350);
                        }

                        if (current_page <= minPage + 4 && current_page > minPage) {
                            newPage = minPage - 20

                            if (current_page > 20) {
                                if (newPage in content) {
                                    return
                                }
                                fetchData(newPage, 'prev', entry)
                            } else {
                                if (1 in content) {
                                    return
                                }
                                setTimeout(() => {
                                    fetchData(1, 'prev', entry)
                                }, 350);
                            }
                        }
                    } else {
                    }
                });
            },
            {
                threshold: 0.6,
            }
        );

        const scrollableDivs = document.querySelectorAll('div[data-page-count]');

        scrollableDivs.forEach((div) => observer.observe(div));

        return () => {
            scrollableDivs.forEach((div) => observer.unobserve(div));
        };
    }

    const fetchData = async (page, type = 'next', entry = -1) => {

        let current_page = $(entry.target).data('page-count');

        if (new Date().getTime() - fetchTime < 5000) {
            return;
        }

        setFetchTime(new Date().getTime());
        fetch = false;
        $('.refetch-loading').addClass('flex').removeClass('hidden');

        let pages;
        let query = {
            language: "en",
            bookId: params?.book_id,
            viewType: viewType,
            pageNumber: page
        };

        try {
            const res = await axios.post('https://api.lib.iq/api/book/getBookPageContent', query, {
                headers: {
                    Authorization: 'Bearer 19|5GvSnUVSQ8haBAZIpMJnXACr84F1QsBrfYeGSelddec006f7'
                }
            });

            pages = res.data.data;

            if (type == 'next') {
                setContent((pastPages) => { return { ...pastPages, ...pages } });
            } else {
                setContent((pastPages) => { return { ...pages, ...pastPages } });
                setKey(Math.random());

                if (entry != -1) {
                    setTimeout(() => {
                        window.document.getElementById('page-' + current_page).scrollIntoView();
                    }, 30);
                }
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            $('.refetch-loading').addClass('hidden').removeClass('flex');
            fetch = true;
        }
    };


    if (content) {
        $('#container-reader').height(Object.values(content).length * 103 + 'vh')
    }

    if (pagesNumber.length > 0) {
        $('#container-reader').height(pagesNumber.length * 103 + 'vh')
    }

    return <>
        <div className="refetch-loading justify-center items-center p-4 hidden">
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#328281] opacity-55" />
        </div>
        <Suspense fallback={<div className="refetch-loading justify-center items-center p-4 hidden">
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#328281] opacity-55" />
        </div>}>
            {

                Object.keys(content ?? {}).length > 0 && Object.keys(content).map((page, index) => {
                    return <PageContent page={page} />
                })
            }

        </Suspense>

        {
            pagesNumber.length > 0 && pagesNumber.map((num) => (
                <div
                    key={num}
                    id={`page-${num}`}
                    className="relative max-w-[800px] overflow-auto"
                    style={{ fontSize: "22px" }}
                    data-page-count={num}
                >
                    <img
                        src={`https://api.lib.iq/api/books/images/${params?.book_id}/${num}`}
                        alt={`Page ${num}`}
                    />
                </div>
            ))
        }
        <div className="refetch-loading justify-center items-center p-4 hidden">
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#328281] opacity-55" />
        </div>
    </>

    function PageContent({ page }) {
        return <div className="relative max-w-[800px] text-right" id={"page-" + page} data-page-count={page}>
            <div id={page} style={{ fontSize: "22px" }} dangerouslySetInnerHTML={{ __html: content[page] }}></div>
            <div className="absolute bottom-2 w-10/12">
                <p className="text-gray-400 flex justify-center border-top-1" dir={language == 'en' ? 'ltr' : 'rtl'} style={{ fontSize: '12pt', borderTop: '1px solid #f1f1f1' }}>{page} {translations.of} {PageCount}</p>
            </div>
        </div>
    }
}

