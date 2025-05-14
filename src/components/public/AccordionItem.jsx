import React, { useState } from 'react';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  return <div className="accordion-item border-b border-gray-200">
    <p  dangerouslySetInnerHTML={{ __html: title }} className="accordion-header py-1 px-2 w-full text-blue-500 focus:outline-none cursor-pointer" onClick={toggleIsOpen}>

    </p>
    <div className={isOpen ? "ps-5" : "accordion-body h-0 p-0 overflow-hidden transition-all"} style={{transition: '0.3s'}}>
      {children}
    </div>
  </div>
}

export default AccordionItem;