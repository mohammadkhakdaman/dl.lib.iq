import { useParams } from "next/navigation"
import { useLanguage } from "../context/LanguageContext"

export default function Detail({info}) {
    const {translations} = useLanguage()
    const params = useParams()
    return <>
        <div className="p-2 rounded-lg">
            <div>
                <img src={`https://api.lib.iq/api/book/Cover/${params?.book_id}`} alt=""
                    className="h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50" />
            </div>
            <h2 className="text-xl font-semibold text-center" dangerouslySetInnerHTML={{ __html: info?.BookTitle }}></h2>
            {
                info?.Author.map(author => {
                    return <p className="text-gray-600 text-sm text-center">{author}</p>
                })
            }
            <div>
                <div className="my-6 flex items-center justify-between">
                    <p className="font-bold text-gray-500">{translations.topic}</p>
                    <p className="mx-2 text-xs font-semibold text-blue-500">
                        {
                            info?.Subject.map((subject, index) => {
                                if (index == 0) {
                                    return <>
                                        <span dangerouslySetInnerHTML={{__html: subject}}></span>
                                    </>
                                } else {
                                    return <>
                                        <span dangerouslySetInnerHTML={{__html: subject + ', '}}></span>

                                    </>
                                }
                            })
                        }
                    </p>
                </div>
                <div className="my-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-500">{translations.publish_date}</p>
                    <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">{info?.PublishDate}</p>
                </div>
                <div className="my-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-500">{translations.publisher}</p>
                    {
                        info?.Publisher?.map((publisher) => {
                            return <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">publisher</p>
                        })
                    }
                </div>
                <div className="my-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-500">{translations.description}</p>
                    {
                        info?.Description?.map(desc => {
                            return <>
                                <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600" dangerouslySetInnerHTML={{ __html: desc }}></p>
                            </>
                        })
                    }
                </div>
                {/* <div className="my-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-500">Fourth option</p>
                    <p className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">23</p>
                </div> */}
            </div>
        </div>
    </>
}