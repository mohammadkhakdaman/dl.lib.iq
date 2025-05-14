'use client'

import { useEffect, useState } from "react"

export default function Modal({ title, children, targetClass = 'modal' }) {
    useEffect(() => {

        window.$ = window.jQuery = require('jquery')

        getDismiss()

        // Open modal
        $(`[data-toggle="${targetClass}"]`).on('click', () => {
            showModal()
        })

        if (targetClass !== 'modal') {
            showModal()
        }

        // Close modal with press escape

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && document.querySelector( '.' + targetClass ).classList.contains('show')) {
                dismissModal()
            }

        })
    }, [])

    // Show modal

    function showModal() {
        var modal = $('.' + targetClass)
        modal.css('display', 'flex')
        setTimeout(() => {
            modal.addClass('show')
        }, 100)
        modal.attr('aria-hidden', 'false')
        document.body.style.overflow = 'hidden'
    }


    // Remove modal

    function dismissModal() {
        var modal = $('.' + targetClass)
        modal.removeClass('show')
        setTimeout(() => {
            modal.css('display', 'none')
        }, 200)
        modal.attr('aria-hidden', 'true')
        document.body.style.overflow = ''
    }

    // Function on dismissing modal by button close

    const getDismiss = () => {

        $('[data-dismiss="modal"]').on('click', () => {
            dismissModal()
        })
    }

    return <>
        <section className="fixed flex items-center justify-center w-100 h-screen flex-col bg-gray-100" style={{zIndex: 100000}}>
            <div
                role="dialog"
                id="modal-example"
                aria-hidden="true"
                style={{ display: "none" }}
                className={targetClass + " fixed top-0 left-0 z-50 w-screen h-screen bg-black/30 flex items-center flex-col justify-center p-6 fade"}
                tabIndex="-1"
            >

                <div
                    className="absolute top-0 left-0 z-[0] w-full h-full"
                    tabIndex="-1"
                    onClick={() => dismissModal()}
                ></div>

                <article
                    className="modal-content w-full sm:min-w-[360px] sm:w-auto flex flex-col relative m-0 rounded-md bg-white sm:my-16"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-body"
                >

                    <nav className="flex p-4 items-center justify-between">
                        <h2 className="m-0 text-xl font-medium max-w-[calc(100%_-_3rem)]">{title}</h2>
                        <button
                            type="button"
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ '--size': '32trm' }}
                            >
                                <line x1="18" y1="6" x2="6" y2="18" style={{ '--size': '32trm' }}></line>
                                <line x1="6" y1="6" x2="18" y2="18" style={{ '--size': '32trm' }}></line>
                            </svg>
                        </button>
                    </nav>
                    <hr className="w-60 mx-auto" />
                    <main className="relative flex-[1_1_auto] p-4 max-h-[80vh] overflow-auto" style={{'--size': '32rem'}}>
                        {children}
                    </main>
                </article>
            </div>
        </section>
    </>
}