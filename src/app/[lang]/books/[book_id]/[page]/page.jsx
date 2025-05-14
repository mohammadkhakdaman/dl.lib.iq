'use client'
import FooterMenu from '@/components/book/FooterMenu';
import Side from '@/components/book/Side';
import Present from '@/components/book/reader/Present';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/home/Header';
import { useLanguage } from '@/components/context/LanguageContext';
import Link from 'next/link';
export default function Home() {

  const [info, setInfo] = useState();
  const params = useParams();
  const { translations, language } = useLanguage()

  useEffect(() => {
    fetchData()
    setVisit()
    $('body').css({ 'background-color': 'rgb(247,247,247)', 'min-height': '100vh' })
    const handleScroll = () => {
      let presentRec = document.querySelector('.present-sec')
      if (presentRec) {
        const rect = presentRec.getBoundingClientRect();
        const sidePanel = document.querySelector('.side-menu')


        if (rect.top <= 0) {
          if (sidePanel.style.transform == 'translate(0)' || sidePanel.style.transform == '') {
            sidePanel.style.position = 'fixed'
            sidePanel.style.right = `${rect.left}px`
          }
        } else {
          sidePanel.style.position = 'sticky'
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  const fetchData = async () => {

    $('.refetch-loading').addClass('flex').removeClass('hidden')

    axios.post('https://api.lib.iq/api/book/getBookMetaData', { bookId: params.book_id }, {
      headers: {
        Authorization: 'Bearer 19|5GvSnUVSQ8haBAZIpMJnXACr84F1QsBrfYeGSelddec006f7'
      }
    }).then(res => {
      let info = res.data.data
      setInfo(info)
    })

    setTimeout(() => {
      $('.refetch-loading').addClass('hidden').removeClass('flex')
      // $('.present').addClass('overflow-auto').removeClass('overflow-hidden')
    }, 500);
  }

  const setVisit = () => {
    axios.post('https://api.lib.iq/api/book/setBookVisit', { bookId: params.book_id }, {
      headers: {
        Authorization: 'Bearer 19|5GvSnUVSQ8haBAZIpMJnXACr84F1QsBrfYeGSelddec006f7'
      }
    })
  }
  return <>
    <Header />
    <main className='bg-[#F7F7F7] min-h-fit'>

      <div className="container reader-box px-4 md:px-0 mx-auto relative mb-[3rem]">
        <div className="w-[90%] sm:w-full md:-top-[10%] left-1/2 grid md:grid-cols-2t">
          <ul className='flex flex-wrap mb-8'>
            <li className=''>
              <Link href={'/' + language}>
                {
                  translations.home
                }
              </Link>
              <span className='mx-2 text-dark'>&gt;</span>
            </li>
            <li className=''>

              <Link href={`/${language}/books`}>
                {
                  translations.book_list
                }
              </Link>
              <span className='mx-2 text-dark'>&gt;</span>
            </li>
            <li className='text-dark'>
              {
                info?.BookTitle
              }
            </li>
          </ul>
          <div id='container-reader' className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Side info={info} toggleMenu={toggleMenu} />
            <Present info={info} key={Math.random()} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>
      <FooterMenu info={info} />
      <div className="w-full h-auto lg:px-12 xl:px-22 2xl:px-72 md:px-24 sm:px-16 px-4 py-1 bg-[#363636] mt-5 fixed bottom-0" style={{ zIndex: 100000 }}>
        <p className="text-center text-white">
          {translations.footer_msg}
        </p>
      </div>
    </main>
  </>
}

function toggleMenu(type = 'collapse') {
  if (type == 'collapse') {
    $('.side-menu').css({ 'transform': 'translate(200%)', 'transition': '0.5s' })
    $('.reader-container').css({ 'width': '100%', 'transition': '0.5s' });
    $('#container-reader .fa-arrow-left').fadeIn()
    $('#container-reader .fa-arrow-right').fadeOut()
    return
  }

  $('.side-menu').css({ 'transform': 'translate(0)', 'transition': '0.5s' });
  $('.reader-container').css({ 'width': 'calc(100% - 366px)', 'transition': '0.5s' })
  $('#container-reader .fa-arrow-left').fadeOut()
  $('#container-reader .fa-arrow-right').fadeIn()
}