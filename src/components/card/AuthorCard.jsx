import Link from "next/link"
import { useLanguage } from "../context/LanguageContext"

export default function AuthorCard({ item }) {
    const {language} = useLanguage()
    return item && <>
        <div class="text-sm leading-6">
            <Link href={`/${language}/books?q=${item.key}&idx=["Author"]`}>
                <figure class="relative flex flex-col-reverse bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
                    <figcaption class="flex items-center space-x-4">
                        <img src="/static/media/avatar.png" alt="" class="flex-none me-5 w-14 h-14 rounded-full object-cover" loading="lazy" decoding="async" />
                        <div class="flex-auto">
                            <div class="text-base text-slate-900 font-semibold dark:text-slate-200">
                                {/* {item.headingMain[0]} */}
                                {item.key}
                            </div>
                            <div class="mt-0.5 dark:text-slate-300">
                                <i className="fa fa-file"></i>
                                <span className="ms-2">
                                    {/* {item?.bookCount} */}
                                    {item?.doc_count}
                                </span>
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </Link>
        </div>
    </>
}