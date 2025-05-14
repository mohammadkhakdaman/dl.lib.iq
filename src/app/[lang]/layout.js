import RootLayout from "../RootLayout";

export async function generateMetadata({ params, searchParams }, parent) {
  
  return {
    author: 'Sanegar',
    title: "lib iq",
    description: "the library of iraq",
    image: '/images/ogimage.jpg',
    keywords: "lms, learning system management, STEAM learning, educational platform, online learning",
    type: 'website',
    siteLanguage: 'en_US',
    siteUrl: 'https://dl.lib.iq',
    openGraph: {
      images: ['/some-specific-page-image.jpg'],
    },
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  }
}

export default function({children}){
 return <RootLayout>{children}</RootLayout>
}