
import { config } from '@/lib';
import Image from 'next/image';

export default function Logo({ type = 'md' }) {
    function setLogo() {
        const sm_src = config.media() + "/logo/logo.png"
        const md_src = config.media() + "/logo/logo.png"
        switch (type) {
            case 'sm':
                return <Image loader={() => sm_src} src={sm_src} width={111}
                    unoptimized
                    height={57}
                    blurDataURL="data:..."
                    placeholder="blur"
                    alt="" />
            case 'md':
                return <Image loader={() => md_src} src={md_src} width={223}
                    unoptimized
                    height={116}
                    blurDataURL="data:..."
                    placeholder="blur"
                    alt="" />
            default:
                break;
        }
    }
    return <>
        {setLogo()}
    </>
}