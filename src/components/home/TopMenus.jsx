import React, { useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TopMenus = () => {
    const { translations, language } = useLanguage();
    const pathname = usePathname();

    const menuItems = [
        { label: translations.home, href: `/${language}` },
        { label: translations.book_list, href: `/${language}/books` },
        { label: translations.authors, href: `/${language}/authors` },
        { label: translations.collections, href: `/${language}/authorities` },
        { label: translations.about_us, href: `/${language}/about` },
        { label: translations.contact_us, href: '#contact-us' },
    ];

    const isActive = (href) => {
        if (href.startsWith('#')) return false;
        return pathname === href;
    };


    return (
        <div className="hidden lg:flex flex-1 justify-center">
            {
                menuItems.map((m, index) => {
                    const active = isActive(m.href);
                    return (
                        <React.Fragment key={m.href}>
                            <Link href={m.href}
                                className={`${active ? 'active' : ''} text-white flex items-center py-1 mx-2 px-4 hover:bg-[#DBA100] hover:text-white hover:rounded hover:border-transparent transition duration-300`}>
                                {m.label}
                            </Link>   
                      
                            {index !== menuItems.length - 1 && (
                                <span className="border-l border-gray-600 h-6 my-2"></span>
                            )}
                            
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}
