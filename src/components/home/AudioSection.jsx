import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function AudioSection() {
    const {translations, language} = useLanguage()
    return <>

        <section className="bg-[#F7F7F7] relative w-full h-auto lg:px-12 xl:px-22 2xl:px-72 md:px-24 sm:px-16 px-4 py-14 mb-12">
            <div className="relative flex flex-col mx-auto md:block md:flex-col sm:max-w-xl md:max-w-full">
                <div style={{lineHeight: "3"}}
                    className="z-0 order-2 md:order-0 flex flex-wrap justify-center content-center top-13 h-full overflow-hidden md:pr-8 md:w-1/2 md:absolute  md:bottom-0 md:left-0 md:items-center">
                    <p className="text-[#11837E] text-center text-3xl">{translations.site_title}</p>
                    <p className="text-2xl text-center my-3">{translations.about_msg}</p>
                    <span className="w-52 border" style={{border: "1px solid #11837E"}}></span>
                    <p className="w-full text-center font-bold"> کربلا، عتبه الحسینیه</p>
                    <Link className="text-white px-12 mt-3 bg-[#11837E] pb-0 flex items-center hover:shadow-2xl scale-90 hover:scale-100 transition-all transform duration-500"
                        style={{borderRadius: "5px"}}
                        href={`/${language}/about`}>{translations.view_more}</Link>

                </div>
                <div className="w-full md:max-w-md md:mb-0">
                    <div className="max-w-xl px-4 ps-1">
                        <div className="flex flex-col items-center sm:flex-row">
                            <img src="./static/media/theme/books.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}