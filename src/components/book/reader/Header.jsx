'use client'

import { useLanguage } from "@/components/context/LanguageContext";
import { useParams } from "next/navigation";

export default function Header({ info, refetch, toggleMenu, viewType, setViewType }) {
    const { translations } = useLanguage();
    const params = useParams()

    const specialPage = (event) => {
        if (event.keyCode === 13) {
            refetch(event.target.value);
        }
    };

    const changePage = (event, type) => {
        const currentPage = parseInt($('#refPage').val()) || 1;
        const newPage = type === 'next' ? currentPage + 1 : currentPage - 1;
    
        if (newPage < 1 || newPage > info?.page_count) {
            alert(translations.no_another_page);
            return;
        }
    
        $('#refPage').val(newPage);
        const targetPage = document.querySelector(`div[data-page-count="${newPage}"]`);
    
        if (targetPage) {
            const container = $('#container-reader .present').hasClass('overflow-auto') ? document.querySelector('.present') : window;
            container.scrollTo({ top: targetPage.offsetTop - (container.offsetTop || 0) + 25, behavior: "smooth" });
        } else {
            refetch(newPage);
        }
    };

    return <>
        <div className="flex justify-between mb-4 items-start top-tools-header">
            <div className="flex items-center basis-1/3">
                <i className="fa fa-arrow-right cursor-pointer ml-2" onClick={() => toggleMenu()}></i>
                <i className="fa fa-arrow-left cursor-pointer ml-2" style={{ display: 'none' }} onClick={() => toggleMenu('in')}></i>
                <div className="hidden lg:flex font-medium text-[#328281] line-clamp-1" dangerouslySetInnerHTML={{ __html: info?.BookTitle }}></div>
            </div>
            <div className="flex justify-center basis-1/3 shrink-0 items-center">
                <span className="px-1 rounded bg-[#B6B6B6] flex justify-center items-center me-2 h-[28px] hover:scale-110 hover:bg-slate-200 cursor-pointer" onClick={(event) => changePage(event, 'prev')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.029" height="11.35" viewBox="0 0 17.029 11.35">
                        <path id="arrow-right" d="M8.941,8.6,2.922,14.616a1.423,1.423,0,0,1-2.006,0l-.5-.5a1.423,1.423,0,0,1,0-2.005L5.006,7.515.413,2.922a1.423,1.423,0,0,1,0-2.005l.5-.5a1.422,1.422,0,0,1,2.006,0L8.941,6.433a1.407,1.407,0,0,1,.406,1.082A1.406,1.406,0,0,1,8.941,8.6Z" transform="translate(1 10.35) rotate(-90)" fill="#fff" stroke="#b6b6b6" stroke-width="2" />
                    </svg>
                </span>
                <input style={{ direction: 'ltr', border: '1px solid #B6B6B6' }} id="refPage" type="text" onKeyUp={(event) => specialPage(event)} defaultValue={params?.page} className="border rounded-sm px-1 text-center h-[28px] w-[46px]" />

                <span className="px-1 rounded bg-[#B6B6B6] flex justify-center items-center ms-2 h-[28px] hover:scale-110 hover:bg-slate-200 cursor-pointer" onClick={(event) => changePage(event, 'next')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.029" height="11.35" viewBox="0 0 17.029 11.35">
                        <path id="arrow-right" d="M8.941,6.432,2.922.413a1.423,1.423,0,0,0-2.006,0l-.5.5a1.423,1.423,0,0,0,0,2.005L5.006,7.515.413,12.108a1.423,1.423,0,0,0,0,2.005l.5.5a1.422,1.422,0,0,0,2.006,0L8.941,8.6a1.407,1.407,0,0,0,.406-1.082A1.406,1.406,0,0,0,8.941,6.432Z" transform="translate(16.029 1) rotate(90)" fill="#fff" stroke="#b6b6b6" stroke-width="2" />
                    </svg>
                </span>
            </div>
            <div className="flex justify-end basis-1/3 shrink-0">
                <div>
                    <ul className="flex items-center">
                        <li>
                            <div className="menu-setting relative me-2">
                                <div className="menu-toggle cursor-pointer" onClick={toggleSetting}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                        <g id="icons" transform="translate(-0.792)">
                                            <path id="settings" d="M21.8,13.2l-1.178-.642a1.823,1.823,0,0,1,0-3.208L21.8,8.708a1.682,1.682,0,0,0,.687-2.475l-.981-1.558a1.938,1.938,0,0,0-2.65-.642l-1.178.642a1.964,1.964,0,0,1-2.944-1.558V1.833A1.907,1.907,0,0,0,12.774,0H10.811A1.907,1.907,0,0,0,8.848,1.833V3.025A1.964,1.964,0,0,1,5.9,4.583l-1.178-.55a1.977,1.977,0,0,0-2.65.642L1.094,6.233A1.921,1.921,0,0,0,1.781,8.8l1.178.642a1.747,1.747,0,0,1,0,3.117L1.781,13.2a1.682,1.682,0,0,0-.687,2.475l.981,1.558a1.938,1.938,0,0,0,2.65.642l1.178-.55a1.964,1.964,0,0,1,2.944,1.558v1.283A1.907,1.907,0,0,0,10.811,22h1.963a1.907,1.907,0,0,0,1.963-1.833V18.975a1.964,1.964,0,0,1,2.944-1.558l1.178.642a1.977,1.977,0,0,0,2.65-.642l.981-1.558A2.009,2.009,0,0,0,21.8,13.2ZM11.792,14.667A3.814,3.814,0,0,1,7.866,11a3.814,3.814,0,0,1,3.926-3.667A3.814,3.814,0,0,1,15.718,11,3.814,3.814,0,0,1,11.792,14.667Z" transform="translate(0)" fill="#328281" />
                                        </g>
                                    </svg>

                                </div>

                                <div className="menu-line">
                                    <div className="btn-app cursor-pointer" onClick={() => toggleFullscreen('#container-reader')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25.505" height="25.505" viewBox="0 0 25.505 25.505">
                                            <g id="Group_33731" data-name="Group 33731" transform="translate(-6.619 12.752) rotate(-45)">
                                                <line id="Line_315" data-name="Line 315" y2="22" transform="translate(13.698 2.698)" fill="none" stroke="#328281" stroke-width="2" />
                                                <line id="Line_316" data-name="Line 316" x1="22" transform="translate(2.698 13.698)" fill="none" stroke="#328281" stroke-width="2" />
                                                <path id="arrow-right" d="M5.16,3.712,1.687.239a.821.821,0,0,0-1.158,0l-.29.29a.821.821,0,0,0,0,1.157l2.65,2.651L.239,6.987a.821.821,0,0,0,0,1.157l.29.29a.821.821,0,0,0,1.158,0L5.16,4.961a.812.812,0,0,0,.234-.624A.811.811,0,0,0,5.16,3.712Z" transform="translate(22 9.361)" fill="#328281" />
                                                <path id="arrow-right-2" data-name="arrow-right" d="M5.16,4.961,1.687,8.435a.821.821,0,0,1-1.158,0l-.29-.29a.821.821,0,0,1,0-1.157l2.65-2.651L.239,1.686a.821.821,0,0,1,0-1.157l.29-.29a.821.821,0,0,1,1.158,0L5.16,3.713a.812.812,0,0,1,.234.624A.811.811,0,0,1,5.16,4.961Z" transform="translate(5.396 18.034) rotate(180)" fill="#328281" />
                                                <path id="arrow-right-3" data-name="arrow-right" d="M5.16,3.712,1.687.239a.821.821,0,0,0-1.158,0l-.29.29a.821.821,0,0,0,0,1.157l2.65,2.651L.239,6.987a.821.821,0,0,0,0,1.157l.29.29a.821.821,0,0,0,1.158,0L5.16,4.961a.812.812,0,0,0,.234-.624A.811.811,0,0,0,5.16,3.712Z" transform="translate(18.034 22) rotate(90)" fill="#328281" />
                                                <path id="arrow-right-4" data-name="arrow-right" d="M5.16,4.961,1.687,8.435a.821.821,0,0,1-1.158,0l-.29-.29a.821.821,0,0,1,0-1.157l2.65-2.651L.239,1.686a.821.821,0,0,1,0-1.157l.29-.29a.821.821,0,0,1,1.158,0L5.16,3.713a.812.812,0,0,1,.234.624A.811.811,0,0,1,5.16,4.961Z" transform="translate(9.361 5.396) rotate(-90)" fill="#328281" />
                                            </g>
                                        </svg>

                                    </div>
                                    <div className="btn-app cursor-pointer" onClick={() => changeZoom('plus', viewType)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25.57" height="25.57" viewBox="0 0 25.57 25.57">
                                            <g id="Group_33729" data-name="Group 33729" transform="translate(0.25 0.25)">
                                                <path id="_211818_search_icon" data-name="211818_search_icon" d="M89.267,87.452,81.9,80.079a9.9,9.9,0,1,0-1.508,1.515l7.36,7.373ZM67.928,80.163a8.845,8.845,0,1,1,6.255,2.588A8.792,8.792,0,0,1,67.928,80.163Z" transform="translate(-64.3 -64)" fill="#328281" stroke="#328281" stroke-width="0.5" />
                                                <g id="Group_31938" data-name="Group 31938" transform="translate(5.658 6.233)">
                                                    <line id="Line_313" data-name="Line 313" x2="8.686" transform="translate(0 4.078)" fill="none" stroke="#328281" stroke-width="1" />
                                                    <line id="Line_314" data-name="Line 314" y2="8" transform="translate(4.559)" fill="none" stroke="#328281" stroke-width="1" />
                                                </g>
                                            </g>
                                        </svg>

                                    </div>
                                    <div className="btn-app cursor-pointer" onClick={() => changeZoom('mines', viewType)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25.57" height="25.57" viewBox="0 0 25.57 25.57">
                                            <g id="Group_33730" data-name="Group 33730" transform="translate(0.25 0.25)">
                                                <path id="_211818_search_icon" data-name="211818_search_icon" d="M89.267,87.452,81.9,80.079a9.9,9.9,0,1,0-1.508,1.515l7.36,7.373ZM67.928,80.163a8.845,8.845,0,1,1,6.255,2.588A8.792,8.792,0,0,1,67.928,80.163Z" transform="translate(-64.3 -64)" fill="#328281" stroke="#328281" stroke-width="0.5" />
                                                <g id="Group_31938" data-name="Group 31938" transform="translate(5.658 10.312)">
                                                    <line id="Line_313" data-name="Line 313" x2="8.686" fill="none" stroke="#328281" stroke-width="1" />
                                                </g>
                                            </g>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                        </li>
                        {
                            (info?.has_text == 1 && info?.has_pdf == 1) && <li title={translations.show_book_image} className={viewType == 'txt' ? "me-2 cursor-pointer text-[#328281]" : "me-2 cursor-pointer rounded px-2 text-[#DBA100] flex items-center"} onClick={() => setViewType('img')} style={{ lineHeight: 0 }}>
                                <i className="fa fa-image" style={{ fontSize: '21px' }}></i>
                            </li>
                        }

                        {
                            (info?.has_text == 1 && info?.has_pdf == 1) && <li title={translations.show_book_text} className={viewType == 'txt' ? "me-2 cursor-pointer rounded px-2 text-[#DBA100] flex items-center" : "me-2 cursor-pointer text-[#328281]"} onClick={() => setViewType('txt')}>
                                <i className="fa fa-text"></i>
                            </li>
                        }


                    </ul>
                </div>
            </div>

        </div>
    </>
}

const toggleFullscreen = (elem) => {
    const isInFullScreen = !!document.fullscreenElement;

    const docElm = document.querySelector(elem);
    if (!docElm) return;

    if (elem === '#container-reader') {
        $('#container-reader .present').toggleClass('overflow-auto h-screen', !isInFullScreen);
    }

    if (isInFullScreen) {
        document.exitFullscreen?.() || document.webkitExitFullscreen?.() || 
        document.mozCancelFullScreen?.() || document.msExitFullscreen?.();
    } else {
        docElm.requestFullscreen?.() || docElm.mozRequestFullScreen?.() || 
        docElm.webkitRequestFullScreen?.() || docElm.msRequestFullscreen?.();
    }
};

const toggleSetting = () => {
    $(".menu-toggle, .menu-line").toggleClass('open');
};

const changeZoom = (type, viewType) => {
    if (viewType === 'img') {
        const imgElems = document.querySelectorAll('.page > div > img');
        if (!imgElems.length) return;

        imgElems.forEach(img => {
            const currentScale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1;
            const newScale = type === 'plus' ? Math.min(currentScale + 0.1, 3) : Math.max(currentScale - 0.1, 0.5);

            $(img).css({ 'transform': `scale(${newScale})`, 'transition': '0.3s' });
        });

    } else {
        const textElems = document.querySelectorAll('.page > div[data-page-count] > div');
        if (!textElems.length) return;

        textElems.forEach(text => {
            const currentSize = parseInt(getComputedStyle(text).fontSize) || 14;
            const newSize = type === 'plus' ? Math.min(currentSize + 2, 72) : Math.max(currentSize - 2, 12);

            $(text).css({ 'font-size': `${newSize}px`, 'transition': '0.3s' });
        });
    }
};


// const changeZoom = (type, viewType) => {
//     const elem = document.querySelector('.page > div[data-page-count] > div');
//     if (!elem) return;

//     const currentSize = parseInt(getComputedStyle(elem).fontSize) || 14;
//     const newSize = type === 'plus' ? Math.min(currentSize + 2, 72) : Math.max(currentSize - 2, 12);

//     if (viewType == 'mg') {
//         $('.page > div > img').css({ 'transform': `scale(${newSize})`, transition: '0.3s' });
//     }
//     $('.page > div > div').css({ 'font-size': `${newSize}px`, transition: '0.3s' });
// };
