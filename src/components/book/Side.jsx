'use client'
import { useEffect } from 'react';
import '@/app/loader'
import Detail from './Detail';
import Search from './Search';
import TableOfContents from './TableOfContents';
import { useLanguage } from '../context/LanguageContext';

// export default function Side({ lists, toggleMenu }) {
export default function Side({ info, toggleMenu }) {
    const { translations } = useLanguage();

    useEffect(() => {
        $('[role="tab"]').on('click', (event) => {
            $('#container-reader ul button').removeClass('active')
            $(event.target).addClass('active')
            $(`[tab-group="${$(event.target).data('tab-group')}"]`).addClass('hidden').removeClass('active')
            $($(event.target).data('tabs-target')).removeClass('hidden')
        });
    }, [])

    return <>
        <div className="side-menu right-0 w-[350px] bg-white border hidden lg:flex border-gray-100 shadow-md shadow-black/5 p-6 pb-2 rounded-md relative">
            <div className="w-full mb-4">
                <div className="max-w-2xl mx-auto h-full">
                    <div className="border-gray-200 dark:border-gray-700 mb-4">
                        <ul className="flex flex-wrap justify-between" style={{backgroundColor: '#F7F6F6', borderRadius: '5px'}}>
                            <li>
                                <button role='tab' data-tab-group="tabpanel" className="active inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" data-tabs-target="#table-content" type="button" > {translations.table_content}</button>
                            </li>
                            <li>
                                <button role='tab' data-tab-group="tabpanel" className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" data-tabs-target="#profile" type="button"> {translations.book_profile}</button>
                            </li>
                            <li>
                                <button role='tab' data-tab-group="tabpanel" className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" data-tabs-target="#search" type="button">{translations.search}</button>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-lg h-table-content overflow-auto">
                        <div className="h-full" id="table-content" tab-group="tabpanel">
                            {/* <TableOfContents lists={lists} /> */}
                            {/* <TableOfContents lists={info?.toc} /> */}
                            <TableOfContents lists={info?.TableOfContet} />
                        </div>
                        <div className="h-full hidden" id="profile" tab-group="tabpanel">
                            {/* <Detail /> */}
                            <Detail info={info} />
                        </div>
                        <div className="h-full hidden" id="search" tab-group="tabpanel">
                            <Search />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}