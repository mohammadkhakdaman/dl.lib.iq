import Link from "next/link"
import { useLanguage } from "../context/LanguageContext"
import { BsTelegram } from "react-icons/bs"
import { RiTelegram2Fill } from "react-icons/ri"

export default function Footer() {
    const {translations, language} = useLanguage()

    const menuItems = [
        { label: translations.book_list, href: `/${language}/books` },
        { label: translations.authors, href: `/${language}/authors` },
        { label: translations.collections, href: `/${language}/authorities` },
        { label: translations.about_us, href: `/${language}/about` },
        { label: translations.contact_us, href: '#contact-us' },
    ];

    return <footer className="relative z-50">
        <div className="relative w-full h-auto lg:px-12 xl:px-22 2xl:px-72 md:px-24 sm:px-16 px-4 py-6 bg-[#235D5C]">
            <div className="flex flex-wrap justify-between">
                <div className=" mt-10 flex justify-center items-center flex-grow flex-shrink basis-0">
                    <img src="/static/media/theme/logo.1738240758935.svg" alt="" style={{maxWidth: '128px'}} />
                </div>
                <div className="mt-10 flex-grow flex-shrink basis-0">
                    <div>
                        <hr className="text-[#36908F] w-[80%]" />
                        <h3 className="relative bg-[#235D5C] pe-3 inline-block text-[#36908F] text-xl font-bold" style={{ top: "-1rem" }}>
                            {translations.our_service}
                        </h3>
                    </div>
                    <div>
                    {
                        menuItems.map((item, index) => {
                            return (
                                <Link href={item.href} key={index} className="text-white inline-block w-[50%]">
                                    {item.label}
                                </Link>
                            )
                        })
                    }
                    </div>
                </div>
                <div className="mt-10 flex-grow flex-shrink basis-0">
                    <div>
                        <hr className="text-[#36908F] w-[80%]" />
                        <h3 className="relative bg-[#235D5C] px-3 inline-block text-[#36908F] text-xl font-bold" style={{ top: "-1rem" }}>
                            {translations.stay_connected}
                        </h3>
                    </div>
                    <div>
                        <Link href='https://t.me/ihlib' target="_blank">
                            <RiTelegram2Fill className=" hover:scale-105 border rounded-full text-white inline-block w-7 h-7 p-1"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="relative w-full h-auto lg:px-12 xl:px-22 2xl:px-72 md:px-24 sm:px-16 px-4 py-1 bg-[#363636]">
            <p className="text-center text-white">
                {translations.footer_msg}
            </p>
        </div>


    </footer>
}