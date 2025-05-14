import React from 'react'
import Header from '../home/Header'
import classNames from 'classnames';
import Footer from '../home/Footer';

const MainLayout = ({children, className, contentClassName, setHeadBackground}) => {

    const style = setHeadBackground ? {
        backgroundImage: 'url("/static/img/header-top.jpg")', 
       //  width: `calc(100% - ${sidebarWidth})`, 
        transition: "0.5s", 
        minHeight: 'calc(100vh - 88px)',
        backgroundSize: '100% 200px'
    } : {};

    const clazz = classNames(
        'flex-grow-1 flex-shrink-0 flex-auto py-3',
        setHeadBackground && 'relative h-max ounded-md bg-repeat-x pt-3 bg-top bg-[#eeeded]',
        contentClassName
    )

    return (
        <div className={`min-h-[100vh] flex flex-col ${className || ''}`}>
            <Header />
            <div className={clazz} style={style}>
                {children}
            </div>
            <Footer home={false}/>
        </div>
    )
}

export default MainLayout;