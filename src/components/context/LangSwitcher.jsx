import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { useConfig } from '@/utils/config';

const LanguageSwitcher = ({column = false, style = null}) => {
  const { setLanguage, language } = useLanguage();
  const pathname = usePathname()
  const {hostDomain} = useConfig()

  const handleLanguageChange = (lang) => {
    let url;

    setLanguage(lang);
    localStorage.setItem('lang', lang);
    
    if (pathname.split('/')[2] == undefined) {
      url = hostDomain + '/' + lang
    }else{
      let local = window.location.href;
      url = local.replace(new RegExp("/[a-z]{2}/"), `/${lang}/`)
    }
    
    window.history.pushState({}, "", url);
  };

  return (
    <div style={style && style} className={column == true ? 'translation-btn-container flex-col items-center w-[85%]' : 'translation-btn-container'}>
      <button onClick={() => handleLanguageChange('en')} className={language == 'en' ? 'text-white' : column == true && 'text-[#b8b8b8]'}>English</button>
      {column == false && <span className='flex items-center text-gray-600 mx-2'>| </span>}
      <button onClick={() => handleLanguageChange('ar')} className={language == 'ar' ? 'text-white' : column == true && 'text-[#b8b8b8]'}>العربیه</button>

      {column == false && <span className='flex items-center text-gray-600 mx-2'>|</span>}

      <button onClick={() => handleLanguageChange('fa')} className={language == 'fa' ? 'text-white' : column == true && 'text-[#b8b8b8]'}>فارسی</button>
    
    </div>
  );
};

export default LanguageSwitcher;
