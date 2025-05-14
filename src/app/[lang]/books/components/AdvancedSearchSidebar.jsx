import Sidebar from '@/components/public/Sidebar'
import SidebarBox from '@/components/public/SidebarBox'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import {useSimpleForm} from '@/utils/hooks/useSimpleForm'
import { useLanguage } from '@/components/context/LanguageContext'
import useFilter from '@/utils/useFilter'
import { useSearchParams } from 'next/navigation'

export const AdvancedSearchSidebar = ({className, refetch}) => {
    const {translations} = useLanguage();
    const { simple } = useFilter();
    const searchParams = useSearchParams()
    const { values, errors, field, validate, resetForm } = useSimpleForm({
        exact: searchParams.get('exact') || '',
        and: searchParams.get('and') || '',
        or: searchParams.get('or') || '',
        not: searchParams.get('not') || ''
    });

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            simple(e.target.name, e.target.value, refetch)
        }
    }

    const inputClassName = 'bg-white focus:outline outline-sky-600 outline-1 rounded-lg py-1 px-2 w-full';

    return (
        <SidebarBox title={'محدوده متن'} icon={<FiEdit/>} className={className}>
            <div className='p-2 flex flex-col justify-stretch gap-2'>
                <div>
                    <div className='text-gray-600'>{translations.phrase_text}</div>
                    <input {...field('exact')} type='text' className={inputClassName} onKeyDown={onKeyDown}/>
                </div>

                <div>
                    <div className='text-gray-600'>{translations.all_words}</div>
                    <input {...field('and')} type='text' className={inputClassName} onKeyDown={onKeyDown}/>
                </div>

                <div>
                    <div className='text-gray-600'>{translations.one_of_word}</div>
                    <input {...field('or')} type='text' className={inputClassName} onKeyDown={onKeyDown}/>
                </div>

                <div>
                    <div className='text-gray-600'>{translations.without_words}</div>
                    <input {...field('and')} type='text' className={inputClassName} onKeyDown={onKeyDown}/>
                </div>
            </div>
        </SidebarBox>
    )
}