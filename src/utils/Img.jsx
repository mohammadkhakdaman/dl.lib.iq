import { config } from "@/lib"


const Img = ({ src, defaultSrc = '/public/images/default.png', remove = false, ...props }) => {
    return <>
        <img {...props} src={config.media() + src} onError={(e) => defaultImg(e, defaultSrc, remove)} />
    </>
}

function defaultImg(e, defaultSrc, remove) {
    e.target.src = config.media() + defaultSrc
    e.target.removeAttribute('onError')
    if (remove) {
        $(remove).remove()
    }
}

export default Img;