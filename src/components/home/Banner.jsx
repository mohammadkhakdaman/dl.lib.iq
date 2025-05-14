import Link from "next/link"
import { useLanguage } from "../context/LanguageContext"

export default function Banner() {
    const { translations } = useLanguage()
    return <>
        <div className="relative flex justify-center lg:justify-between flex-wrap lg:flex-nowrap space-y-6 lg:space-y-0 w-full h-auto lg:px-12 xl:px-22 2xl:px-72 md:px-24 sm:px-16 px-4 py-6 my-6">

            <Link href={`https://imamhussain-lib.com/arb/`}>
                <article style={{ borderRadius: "10px" }}
                    className="relative flex flex-col items-center justify-center lg:me-8 rounded overflow-hidden">
                    <img src="/static/media/theme/Rectangle 12897.png" alt={translations.latest_books} className="w-full" />
                    <div className="absolute h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
                    <div className="absolute w-full h-full flex jsutify-center content-center flex-wrap">
                        <h3 className="z-10 text-white w-full text-center fs-22">{translations.latest_books}</h3>
                    </div>
                </article>
            </Link>
            <Link href={`https://lib.iq`}>
                <article style={{ borderRadius: "10px" }}
                    className="relative flex flex-col items-center justify-center lg:ms-8 rounded overflow-hidden">
                    <img src="/static/media/theme/Rectangle 12896.png" alt={translations.month_book} className="w-full" />
                    <div className="absolute h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
                    <div className="absolute w-full h-full flex jsutify-center content-center flex-wrap">
                        <h3 className="z-10 text-white w-full text-center fs-22">{translations.month_book}</h3>
                    </div>
                </article>
            </Link>
        </div>
    </>
}