'use client'

import AudioSection from "@/components/home/AudioSection"
import Collections from "@/components/home/Collections"
import CounterSection from "@/components/home/CounterSection"
import Footer from "@/components/home/Footer"
import Header from "@/components/home/Header"
import HeroSection from "@/components/home/HeroSection"
import MostView from "@/components/home/MostView"
import Newest from "@/components/home/Newest"
import Banner from "@/components/home/Banner"
import useData from "@/utils/useData"
import { useEffect, useState } from "react"
import { BookService } from "@/service/BookService"

export default function Home() {
    const [data, setData] = useState()
    const { get } = useData()

    useEffect(() => {
        window.$ = window.jQuery = require('jquery')
        fetchInfo()
    }, [])

    const fetchInfo = () => {
        BookService.statistics().then(res => {
            console.log(res);
            setData(res.data);
        })
    }

    return <>
        <Header />
        <HeroSection />
        <CounterSection data={data} key={Math.random()} />
        <Newest />
        <AudioSection />
        <MostView />
        <Collections />
        <Banner />
        <Footer />
    </>
}