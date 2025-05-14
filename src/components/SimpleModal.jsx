import { useParams } from "next/navigation"

export default function SimpleModal({ children, modalInfo, setModalInfo }) {
    const {lang} = useParams()

    return <div className="rtl fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center overflow-auto" style={{ zIndex: 100000000 }}>
        <div  onClick={() => {setModalInfo({...modalInfo, show: false})}} className="absolute w-full h-full" style={{backgroundColor: 'rgba(0,0,0,0.4)'}}></div>
        <div className="sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] bg-white rounded-md border shadow-md p-4 relative">
            <div className={lang == 'en' ? "rtl text-start": "ltr text-start"}>
                <div className="flex justify-around">
                    <h3 className={lang == 'en' ? "line-clamp-1 text-gray-700 w-full" : "text-start line-clamp-1 text-gray-700 w-full"}>
                        {modalInfo?.title ?? ''}
                    </h3>
                    <button className="hover:text-red-600 duration-150 hover:scale-105" onClick={() => {setModalInfo({...modalInfo, show: false})}}>X</button>
                </div>
                <hr className="w-11/12 mx-auto my-2" />
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    </div>
}