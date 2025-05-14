import { useLanguage } from "@/components/context/LanguageContext";
import LanguageSwitcher from '@/components/context/LangSwitcher';
import Link from "next/link";

export default function BreadCrumb({ info }) {
    const { translations, language } = useLanguage()
    return <>
        {/* <section className="w-full h-[320px] md:h-[30vh] bg-cover bg-center brightness-50 bg-[#289ccb]" style={{height: '320px', backgroundImage: "url('/static/media/theme/BG-slider-2.jpg')", */}
        <section className="w-full relative" style={{ height: '380px' }}>
            <img class="absolute top-0 left-0 w-full h-full z-0" src="/static/media/theme/BG-slider-2.jpg" alt=""></img>
            <img class="absolute top-0 left-0 w-full h-full z-0" src="/static/media/theme/Group 31452.png" alt=""></img>

            <div className="relative flex justify-between -translate-y-1/2 text-white w-full" style={{ top: '4rem', padding: '0 1.5rem' }} >
                <img src="/static/media/theme/logo.png" class="mb-5" alt="" width={360} style={{ margin: '0 auto' }} />
            </div>
            <div className="relative flex justify-between top-1/3  text-white w-full" style={{ top: '7rem', padding: '0 7rem' }} >
                {/* <ul className='flex'>
                    <li className=''>
                        <Link href={'/' + language}>
                            {
                                translations.home
                            }
                        </Link>
                        <span className='mx-2'>&gt;</span>
                    </li>
                    <li className=''>

                        <Link href={`/${language}/books`}>
                            {
                                translations.book_list
                            }
                        </Link>
                        <span className='mx-2'>&gt;</span>
                    </li>
                    <li className=''>
                        {
                            info?.BookTitle
                        }
                    </li>
                </ul> */}
                {/* <LanguageSwitcher style={{ position: 'static' }} /> */}
            </div>
        </section>
    </>
}