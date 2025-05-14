import { useLanguage } from "@/components/context/LanguageContext"
import { useEffect } from "react"
import SectionLink from "./SectionLink";

export default function Counter({data}) {
    const { translations, language } = useLanguage();

    useEffect(() => {
        if (data?.bookCount) {
            counter(data)
        }
    }, [])

    const sections = [
        {
            id: 'bookCount',
            icon: 'fa-book',
            title: translations.book_list,
            link: `/${language}/books`
        },
        {
            id: 'authorCount',
            icon: 'fa-users',
            title: translations.authors,
            link: `/${language}/authors`
        },
        {
            id: 'subjectCount',
            icon: 'fa-folder',
            title: translations.topics,
            link: `${language}/authorities`
        }
    ]

    return <>
        <div className="flex justify-center p-3 pt-0 mb-5" style={{ direction: 'rtl' }}>
            <div className="w-full">
                <div className="pt-4 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <p className="mt-3 text-xl leading-7 text-gray-600 dark:text-gray-400 sm:mt-4">
                                {translations.collected_many_book}
                            </p>
                        </div>
                    </div>
                    <div className="pb-12 mt-10 bg-gray-50 dark:bg-gray-900 sm:pb-2">
                        <div className="relative">
                            <div className="absolute inset-0 h-1/2 bg-gray-50 dark:bg-gray-900"></div>
                            <div className="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                                <div className="max-w-4xl mx-auto">
                                    <dl className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                                        {
                                            sections.map(item => <SectionLink item={item} />)
                                        }
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}


const counter = (data) => {
    const targets = [
        { element: document.getElementById('bookCount'), count: data?.bookCount, suffix: '+' },
        { element: document.getElementById('authorCount'), count: data?.authorCount, suffix: '+' },
        { element: document.getElementById('subjectCount'), count: data?.subjectCount, suffix: '+' }
    ];

    function animateCountUp(target, duration) {
        let currentCount = 0;
        const increment = Math.ceil(target.count / (duration / 10));

        const interval = setInterval(() => {
            currentCount += increment;
            if (currentCount >= target.count) {
                clearInterval(interval);
                currentCount = target.count;
                target.element.textContent = currentCount + target.suffix;
            } else {
                target.element.textContent = currentCount;
            }
        }, 10);
    }

    targets.forEach(target => {
        animateCountUp(target, 500);
    });
}
