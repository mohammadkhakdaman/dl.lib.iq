"use client"

export const config = {
    host: () => {
        return process.env.NEXT_PUBLIC_BACKEND_URL;
    },
    front: () => {
        return process.env.NEXT_PUBLIC_FRONT_URL;
    },
    lUrl: () => {
        return process.env.NEXT_PUBLIC_MASTERSHIP_LARA_URL;
    },
    assets: () => {
        return process.env.NEXT_PUBLIC_SITE_ASSETS_URL;
    },
    media: () => {
        return process.env.NEXT_PUBLIC_MEDIA_URL;
    },
    defaultLogo: () => {
        return process.env.NEXT_PUBLIC_DIR_LOGO;
    },
    footerLogo: () => {
        return process.env.NEXT_PUBLIC_DIR_FOOTER_LOGO;
    }
}

export const useConfig = () => {

    return {
        hostDomain: config.host(),
        nextDomain: config.front(),
        mediaPath: config.media(),
        assetsPath: config.assets(),
        defaultLogo: config.defaultLogo(),
        footerLogo: config.footerLogo()
    }
}