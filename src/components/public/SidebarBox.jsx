import React, { useState } from 'react'
import { BiCaretDown } from 'react-icons/bi'
import { FaAngleUp } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6'

function SidebarBox({children, className, icon, title, defaultCollapsed = false}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className={`bg-gray-75 rounded p-1 ${className || ''}`} style={{fontSize: '13px'}}>
        <div className='p-1 border-b border-gray-300 flex-row flex items-center gap-2'>
            {icon}
            <span className='flex-1'>{title}</span>

            <span className='rounded-full p-2 hover:bg-gray-200 cursor-pointer' onClick={() => {setCollapsed(!collapsed)}}>
            { collapsed ? <FaAngleUp/> : <FaAngleDown /> }
            </span>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${collapsed ? 'max-h-0' : 'max-h-[1000px]'}`}>
          { children}
        </div>
    </div>
  )
}

export default SidebarBox