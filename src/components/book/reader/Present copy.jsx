import Header from "./Header";
import Pages from "./Pages";

export default function Present({ data, refetch, toggleMenu }) {
// export default function Present({ data, info, refetch, toggleMenu }) {
    
    return <>
        <div className="present-sec reader-container absolute bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md  min-h-[80vh]">
            <Header PageCount={data?.PageCont} refetch={refetch} toggleMenu={toggleMenu} />
            {/* <Header title={info?.BookTitle} PageCount={parseInt(info?.Description[0])} refetch={refetch} toggleMenu={toggleMenu} /> */}
            <div className="present p4 text-center page overflow-auto" style={{ height: 'calc(100vh - 60px)' }}>

                {/* <div className="sticky-spinner h-full w-full top-[-3px] z-10 flex items-center justify-center" style={{ position: 'sticky' }}>
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
                </div> */}
                <Pages pages={data} PageCount={data?.PageCont} />
                {/* <Pages pages={data?.Pages} PageCount={data?.PageCont} /> */}
                {/* <Pages pages={data} PageCount={parseInt(info?.Description[0])} /> */}
            </div>
        </div>
    </>
}