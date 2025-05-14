'use client'
import { useLanguage } from "@/components/context/LanguageContext";
import { Input } from "@/components/Forms/Input";
import MultiSelect from "@/components/Forms/MultiSelect";
import { Select } from "@/components/Forms/Select";
import MainLayout from "@/components/public/MaiLayout";
import appConfig from "@/config/appConfig";
import Tools from "@/utils/Tools";
import useData from "@/utils/useData";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
    const { translations, language } = useLanguage()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [items, setItems] = useState([])
    const { post } = useData()
    const { toQueryString } = Tools();
    const [subject, setSubject] = useState();
    const [query, setQuery] = useState({
        sort_by: 1,
        exact: "string",
        and: "string",
        not: "string",
        language: [
            'null'
        ],
        subjectId: [
            0
        ],
        publishYearFrom: 0,
        publishYearTo: 0,
        // limit: [
           
        // ],
        idx: [
            "All"
        ],
        offset: 0,
        count: 12,
        sortType: 0,
        q: "string"
    })

    useEffect(() => {

        window.$ = window.jQuery = require('jquery')
        var jsSearchParams = new URLSearchParams(window.location.search)
        var data;

        data = {
            "authorityType": "Subject",
            "offset": 0
        };
        fetchData(data)
    }, [])

    const fetchData = async (data) => {
        post(`${appConfig.apiBaseUrl}/api/Authorities/AuthoritySearch`, data, setItems)
    }

    return <>
        <MainLayout>
            <div className="p-4 rtl mt-20">
                <div className="grid grid-cols-1pt-5 w-full">
                    <div>
                        <h4>{translations.advanced_search}</h4>
                        <hr className="text-red-700 my-4" />
                    </div>
                    <div className="w-4/5 mx-auto mt-4">
                        <Input label={translations.all_words} onChange={(event) => setQuery({ ...query, exact: event.target.value })} />
                        <Input label={translations.phrase_text} onChange={(event) => setQuery({ ...query, and: event.target.value })} />
                        <Input label={translations.one_of_word} onChange={(event) => setQuery({ ...query, q: event.target.value })} />
                        <Input label={translations.without_words} onChange={(event) => setQuery({ ...query, not: event.target.value })} />
                        <hr className="my-5" />
                        <MultiSelect options={items.map(item => item.key)} />
                        <hr className="my-4" />
                        <Select label={translations.arrangement} onChange={(event) => setQuery({ ...query, sort_by: event.target.value })}>
                            <option value="1">{translations.relationship}</option>
                            <option value="2">{translations.history}</option>
                            <option value="3">{translations.title}</option>
                        </Select>
                        <Select label={translations.number_of_result_per_page} onChange={(event) => setQuery({ ...query, offset: event.target.value })} labelStyle={{fontSize: '10pt', border: '1px solid #ced4da'}}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </Select>
                        
                        <Link className="bg-blue-900 text-white px-5 py-2 rounded shadow transition hover:scale-105 hover:shadow-md" href={'/' + language + '/books' + toQueryString(query)}>{translations.research}</Link>
                    </div>
                </div>
            </div>
        </MainLayout >
    </>
}