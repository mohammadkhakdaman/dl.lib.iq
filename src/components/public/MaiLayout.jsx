import Header from "../home/Header";
import Loading from "../ui/Loading";
import Footer from "./Footer"
import {Header as SubHeader} from "./Header";
import HomeSidebar from "./HomeSidebar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children, loading, home = false, refetch = null, sideData = null }) => {
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
        <div className="" style={{direction: 'ltr'}}>

            <div className="px-4 md:px-0 mx-auto relative mb-[3rem]">
            {
                home && <HomeSidebar toggleMenu={toggleMenu} />
            }

            <div id="main-container" className="relative h-max ounded-md bg-repeat-x pt-3 bg-top bg-[#eeeded]" 
                    style={{
                         backgroundImage: 'url("/static/img/header-top.jpg")', 
                        //  width: `calc(100% - ${sidebarWidth})`, 
                         transition: "0.5s", 
                         minHeight: 'calc(100vh - 88px)',
                         backgroundSize: '100% 200px'
                        }}>

                {home == false && <SubHeader className={'bg-transparent border-none shadow-none px-36'}  refetch={refetch} width={sidebarWidth} key={Math.random()}/>}
                <div className="px-36 mt-2 flex flex-row items-start gap-3">
                    {children}
                    { loading || <Sidebar refetch={refetch} sideData={sideData} toggleMenu={toggleMenu} key={Math.random()}/> }
                </div>
            </div>

            </div>
        <Footer width={sidebarWidth} home={home} />
        </div>

    </>
}

export default MainLayout