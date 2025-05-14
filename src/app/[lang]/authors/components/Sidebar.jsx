import React from 'react'
import AlphabetGrid from './AlphabetGrid';
import SidebarBox from '@/components/public/SidebarBox';
import { MdEdit, MdFontDownload } from 'react-icons/md'
import AuthorsSidebarContent from './AuthorsSidebarContent';

const Sidebar = ({authors}) => {
    return (
        <div className="flex-col gap-4 bg-white p-4 rounded-lg flex-shrink-0 w-[300px] hidden md:flex">
            <SidebarBox title={'الفبا'} icon={<MdFontDownload/>}>
                <AlphabetGrid authors={authors}/>
            </SidebarBox>

            <SidebarBox title={'نویسندگان'} icon={<MdEdit/>}>
                <AuthorsSidebarContent authors={authors}/>
            </SidebarBox>
        </div>
    )
}

export default Sidebar;