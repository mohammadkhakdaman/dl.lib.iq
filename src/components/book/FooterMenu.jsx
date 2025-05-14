'use client'
import { useEffect, useState } from "react"
import Modal from "../Modal"
import Detail from "./Detail"
import TableOfContents from "./TableOfContents"
import Search from "./Search"
import { useLanguage } from "../context/LanguageContext"

export default function FooterMenu({info}) {
    const {translations} = useLanguage();

    const [modalContent, setModalContent] = useState({
        title: null,
        content: null
    })
    
    return <>
        <section className="w-full lg:hidden rounded-tl-[40px] p-3 fixed bottom-0 bg-white border border-gray-200 shadow-lg shadow-black z-10">
            <ul className="flex justify-evenly">
                <li>
                    <i className="fa fa-eye cursor-pointer" onClick={() => setModalContent({ title: translations.book_profile, content: <Detail info={info} /> })}
                        data-toggle="modal"></i>
                </li>
                <li>
                    <i className="fa fa-bars cursor-pointer" onClick={() => setModalContent({ title: translations.table_content, content: <TableOfContents lists={info?.TableOfContet}/> })}
                        data-toggle="modal"></i>
                </li>
                <li>
                    <i className="fa fa-search cursor-pointer" onClick={() => setModalContent({ title: translations.search, content: <Search /> })}
                        data-toggle="modal"></i>
                </li>
            </ul>
        </section>
        <Modal title={modalContent?.title}>
            {modalContent?.content}
        </Modal>
    </>
}