"use client";

import { NextResponse } from 'next/server'

export function middleware(req) { 
  // const ContentSecurityPolicy1 = `
  //   default-src *;
  //   script-src *;
  //   style-src 'self' http://localhost:8000/ http://127.0.0.1:8000;
  //   font-src 'self' https://fonts.gstatic.com http://127.0.0.1:8000 http://localhost:8000 http://127.0.0.1:3000; 
  // `

  // const ContentSecurityPolicy = `
  //   font-src 'self' http://127.0.0.1:8000 https://fonts.gstatic.com http://localhost:8000 http://127.0.0.1:3000 data:;
  // `
  const response = NextResponse.next();

  // response.headers.set('Content-Security-Policy', ContentSecurityPolicy.replace(/\n/g, ''))
  // response.headers.set('X-Frame-Options', 'deny')
  // response.headers.set('X-Content-Type-Options', 'nosniff')
  // response.headers.set('Referrer-Policy', 'strict-origin')
  // // response.headers.set('Referrer-Policy', 'unsafe-url')
  // response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  // response.headers.set('X-XSS-Protection', '1; mode=block')
  // response.headers.set('Permissions-Policy', 'camera=(self); battery=(); geolocation=(); microphone=()')

  return response
}

export const config = {
  matcher: ['/:path*'],
};

// https://stackoverflow.com/questions/72593890/cant-get-csp-to-work-as-intended-in-nextjs