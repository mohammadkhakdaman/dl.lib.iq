import Link from "next/link";

export default function SectionLink({ item }) {
    return item && <>
        <Link href={item?.link} className="hover:scale-110 transition">
            <div
                class="flex flex-col p-6 text-center hover:rounded-sm hvoer-shadow bg-white border-t border-gray-100 dark:border-gray-700 sm:border-0 sm:border-l">
                <dl>
                    <dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">

                        <i className={"text-2xl fa " + item.icon}></i>
                        <p className="-mt-1">{item.title}</p>
                    </dt>
                    <dd class="order-1 text-4xl font-extrabold leading-none text-[#289ccb] dark:text-indigo-100"
                        id={item.id}>
                        0
                    </dd>
                </dl>
            </div>
        </Link>
    </>
}