export default function Banner() {
    return <>
        <div className="w-full mt-5 flex h-auto lg:px-12 space-x-2 xl:px-22 2xl:px-52 md:px-24 sm:px-16 px-4 py-4 items-center justify-between">

            <article style={{ borderRadius: "10px" }}
                className="relative flex flex-col items-center justify-center rounded overflow-hidden">
                <img src="/static/media/theme/Rectangle 12897.png" alt="جدید ترین کتاب" className="w-full" />
                <div className="absolute h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
                <div className="absolute w-full h-full flex jsutify-center content-center flex-wrap">
                    <h3 className="z-10 mt-3 text-white w-full text-center" style={{ fontSize: "22px" }}>جدید ترین کتاب</h3>
                    <p className="z-10 gap-y-1 text-sm leading-6 text-gray-300 w-full text-center" style={{ fontSize: "30px" }}>دلائل النبوة ومعرفة أحوال صاحب
                        الشريعة</p>
                </div>
            </article>
            <article style={{ borderRadius: "10px" }}
                className="relative flex flex-col items-center justify-center rounded overflow-hidden">
                <img src="/static/media/theme/Rectangle 12896.png" alt="کتاب انتخابی این ماه" className="w-full" />
                <div className="absolute h-full w-full bg-[rgba(0,0,0,0.4)]"></div>
                <div className="absolute w-full h-full flex jsutify-center content-center flex-wrap">
                    <h3 className="z-10 mt-3 text-white w-full text-center" style={{ fontSize: "22px" }}>کتاب انتخابی این ماه</h3>
                    <p className="z-10 gap-y-1 text-sm leading-6 text-gray-300 w-full text-center" style={{ fontSize: "30px" }}>دراسة في علامات الظهور</p>
                </div>
            </article>
        </div>
    </>
}