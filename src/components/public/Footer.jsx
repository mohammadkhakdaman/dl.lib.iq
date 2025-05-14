import { useConfig } from "@/utils/config";

const Footer = ({width, home}) => {
    const {footerLogo} = useConfig()
    
    return <footer className={home ? "fixed bottom-0 left-0 w-full h-16 flex justify-center bg-[#289ccb] p-2" : "flex-auto flex-grow-0 flex-shrink-0 relative w-full h-16 flex justify-center bg-[#289ccb] p-2"} style={{ width: `calc(100% - ${width})` }}>
        <img src={footerLogo} alt="" />
    </footer>
}
export default Footer;