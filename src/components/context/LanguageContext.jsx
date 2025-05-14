import { usePathname } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {

  const pathname = usePathname()
  const initLang = () => {
    if (pathname.split('/')[1] == 'ar' || pathname.split('/')[1] == 'en' || pathname.split('/')[1] == 'fa') {
      return pathname.split('/')[1]
    } else {
      return 'ar'
    }
  }
  const [language, setLanguage] = useState(initLang());

  useEffect(() => {
    const storedLanguage = localStorage.getItem('lang');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const loadTranslations = async (lang) => {
    try {
      const response = await fetch(`/locales/${lang}/common.json`);
      return await response.json();
    } catch {
      return ({});
    }
  };

  const [translations, setTranslations] = useState({});

  useEffect(() => {
    loadTranslations(language).then(setTranslations);
  }, [language]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
