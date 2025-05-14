import Link from "next/link"
import LanguageSwitcher from "../context/LangSwitcher"
import { useLanguage } from "../context/LanguageContext";

const HomeSidebar = ({ toggleMenu }) => {
    const { translations, language } = useLanguage();

    return <>
        <div className="side-menu h-full fixed top-0 bottom-0 z-50 md:flex flex-col overflow-auto justify-start items-center right-0 hidden bg-[#0e2043] text-white w-[100px]" style={{ transform: "translate(0px)", transition: "0.5s" }}>
            <div className="w-full flex justify-end h-min p-3">
                <i onClick={() => toggleMenu()} className="fa fa-arrow-circle-right cursor-pointer hover:scale-125"></i>
            </div>

            <ul>
                <li className="mt-4 text-center">
                    <Link href={`/${language}`} className="text-white">
                        <i className="fa fa-user text-2xl"></i>
                    </Link>
                    <hr className="text-white" />
                </li>
                <li className="mt-4 text-center">
                    <Link href={`/${language}/books`} className="text-white">
                        <i className="fa fa-book text-2xl"></i>
                        <p className="-mt-1">{translations.book_list} </p>
                    </Link>
                    <hr className="text-white" />
                </li>
                <li className="mt-4 text-center">
                    <Link href={`/${language}/authors`} className="text-white">
                        <i className="fa fa-users text-2xl"></i>
                        <p className="-mt-1">{translations.authors}</p>
                    </Link>
                    <hr className="text-white" />
                </li>
                <li className="mt-4 text-center">
                    <Link href={`/${language}/authorities`} className="text-white">
                        <i className="fa fa-folder text-2xl"></i>
                    </Link>
                    <p className="-mt-1">{translations.topics}</p>
                </li>
                <li className="mt-4 text-center">
                    <LanguageSwitcher column={true} />
                </li>
            </ul>
        </div>
    </>
}

export default HomeSidebar