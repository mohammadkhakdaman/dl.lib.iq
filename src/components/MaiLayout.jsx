import Header from "../home/Header";
import Footer from "./Footer"
import {Header as SubHeader} from "./Header";
import HomeSidebar from "./HomeSidebar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children, home = false, refetch = null, sideData = null }) => {
    let sidebarWidth = home ? '100px' : '300px'
    function toggleMenu(type = 'collapse') {

        if ($('#main-container > div.fixed > i.fa-arrow-circle-left').css('display') == 'block') {
            type = 'collapsed'
        }

        if (type == 'collapse') {
            $('.side-menu').css({ 'transform': 'translate(200%)', 'transition': '0.5s' })
            $('#main-container, footer, header').css({ 'width': '100%', 'transition': '0.5s' });
            $('#main-container .fa-arrow-circle-left').fadeIn()
            return
        }
        
        $('.side-menu').css({ 'transform': 'translate(0)', 'transition': '0.5s' });
        $('#main-container, footer, header').css({ 'width': `calc(100% - ${sidebarWidth})`, 'transition': '0.5s' })
        $('#main-container .fa-arrow-circle-left').fadeOut()

    }
    
    return <>
        <div className="grid grid-cols-1  gap-6" style={{direction: 'ltr'}}>
            {
                home ? <HomeSidebar toggleMenu={toggleMenu} /> : <Sidebar refetch={refetch} sideData={sideData} toggleMenu={toggleMenu} key={Math.random()}/>
            }

            <div id="main-container"
                className="relative h-max ounded-md"
                // className="relative h-max bg-white border border-gray-100 shadow-md shadow-black/5 rounded-md"
                style={{ width: `calc(100% - ${sidebarWidth})`, transition: "0.5s", minHeight: 'calc(100vh - 88px)' }}>
                <div className="fixed flex p-3 z-[10000] right-0">
                    <i onClick={toggleMenu} className="fa fa-arrow-circle-left text-white cursor-pointer ml-2 hover:scale-125 md:hidden"></i>
                </div>

                {home == false && <SubHeader  refetch={refetch} width={sidebarWidth} key={Math.random()}/>}
                {children}
            </div>
        <Footer width={sidebarWidth} home={home} />
        </div>

    </>
}

export default MainLayout