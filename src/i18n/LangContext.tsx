import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Lang, t, Translations } from './translations';

interface LangContextValue {
  lang: Lang;
  tr: Translations;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) ?? 'ar');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'));

  return (
    <LangContext.Provider value={{ lang, tr: t[lang] as Translations, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
