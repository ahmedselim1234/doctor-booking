import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Menu, X, Languages } from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { tr, toggleLang, lang } = useLang();

  const navLinks = [
    { to: '/', label: tr.home },
    { to: '/doctors', label: tr.doctors },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[#1D9E75] font-bold text-xl">
          <Stethoscope size={26} />
          <span>{lang === 'ar' ? 'طبيبي' : 'Tabeebi'}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition-colors ${
                pathname === link.to ? 'text-[#1D9E75]' : 'text-[#6B7280] hover:text-[#1D9E75]'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-sm font-medium text-[#6B7280] hover:border-[#1D9E75] hover:text-[#1D9E75] transition-colors cursor-pointer"
          >
            <Languages size={15} />
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
        </nav>

        {/* Mobile: lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="border border-[#E5E7EB] rounded-lg px-2.5 py-1 text-xs font-medium text-[#6B7280]"
          >
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
          <button className="text-[#6B7280]" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-medium text-[#1a1a1a] hover:text-[#1D9E75]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
