import { usePathname } from 'next/navigation';
import { Select } from '../Forms/Select';
import { useLanguage } from './LanguageContext';
import { useConfig } from '@/utils/config';

const SelectLangSwitcher = () => {
  const { setLanguage, language } = useLanguage();
  const pathname = usePathname()
  const { hostDomain } = useConfig()

  const handleLanguageChange = (event) => {
    let lang = event.target.value
    let url;

    if (pathname.split('/')[2] == undefined) {
      url = hostDomain + '/' + lang
    } else {
      let local = window.location.href;
      url = local.replace(new RegExp("/[a-z]{2}/"), `/${lang}/`)
    }

    window.history.pushState({}, "", url);


    setLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <div className="switch">
      <Select
        style={{fontSize: '0.85em'}}
        margin="my-0"
        onChange={handleLanguageChange}
        value={language}
        className="bg-white lang-icon text-normal w-6 pe-2 !ps-4 text-[#363636] hover:bg-gray-200 rounded transition duration-300">
        <option value="en">English</option>
        <option value="ar">العربیة</option>
        <option value="fa">فارسی</option>
      </Select>
    </div>
  );
};

export default SelectLangSwitcher;
