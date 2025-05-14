"use client"
import { useEffect } from 'react';

export default function Main(){
    let lang = 'ar';
    //localStorage.getItem('lang') == null ?  lang = 'ar': lang = localStorage.getItem('lang')
    useEffect(() =>{
        window.location.href = "./" + lang;
    });
}