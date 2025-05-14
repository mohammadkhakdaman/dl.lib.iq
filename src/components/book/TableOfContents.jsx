// import AccordionItem from "../public/AccordionItem";

import Link from "next/link"
import { useParams } from "next/navigation"
import { useLanguage } from "../context/LanguageContext"

export default function TableOfContents({ lists }) {
    const params = useParams()
    const {language} = useLanguage()
    
    return lists && <>
        {
            lists?.length > 0 ? <div className="p-2 rounded-lg">
                <ul>

                    {
                        lists.map((list) => {
                            return <li>
                                <span><i class="fa fa-file me-2"></i>
                                    <Link className="hover:scale-95 transition" href={`/${language}/books/${params.book_id}/${list?.pageNumber}`} dangerouslySetInnerHTML={{ __html: list.title }}></Link>
                                </span>
                            </li>
                        })
                    }

                </ul>
            </div>
                :
                <div className="justify-center items-center p-4 flex">
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600 opacity-55" />
                </div>
        }
    </>

    // return <>
    //     <div className="p-2 rounded-lg">            
    //         {
    //             lists?.length > 0 ? lists?.map((list) => {
    //                 return <AccordionItem title={list[3]}>
    //                     {list[3]}
    //                 </AccordionItem>
    //             }) : <div className="justify-center items-center p-4 flex">
    //             <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600 opacity-55" />
    //         </div>
    //         }

    //     </div>
    // </>
}