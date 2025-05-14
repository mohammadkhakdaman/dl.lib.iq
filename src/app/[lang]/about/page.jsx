'use client'
import { useLanguage } from '@/components/context/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import Loading from '@/components/ui/Loading';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaCaretLeft } from 'react-icons/fa6';

export default function About() {
    const {language, translations} = useLanguage();
    const [content, setContent] = useState('');
    const [state, setState] = useState('loading');

    const fetchContent = async () => {
        try {
            setState('loading');
            const resp = await fetch(`/locales/${language}/about.html`);
            const text = await resp.text();
            setContent(text);
            setState('idle')
        }
        catch(error) {
            setState('error')
        }
    }

    useEffect(() => {
        fetchContent()
    }, [language]);

    return (
        <MainLayout setHeadBackground contentClassName={'px-8 xl:px-36'}>
            <h2 className='text-white text-center text-2xl mt-5'>{translations.about_us}</h2>
            <h3 className='text-white text-normal mt-1 flex items-center gap-2 justify-center'>
                <Link href={`/${language}`} className='text-white'>{translations.home}</Link>
                <FaChevronLeft/>
                <span>{translations.about_us}</span>
            </h3>

            <Loading type='cover' loading={state == 'loading'} className='bg-white rounded-lg shadow-lg p-12 mt-5 mx-auto'>
                <div dangerouslySetInnerHTML={{__html: content || ''}}></div>

                {state == 'error' && <div>بروز خطا!</div> }
            </Loading>
        </MainLayout>
    )
}