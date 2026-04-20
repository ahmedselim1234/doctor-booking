import { Stethoscope } from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

export function Footer() {
  const { tr, lang } = useLang();

  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#1D9E75] font-bold text-lg">
          <Stethoscope size={20} />
          <span>{lang === 'ar' ? 'طبيبي' : 'Tabeebi'}</span>
        </div>
        <p className="text-sm text-[#6B7280]">{tr.rights}</p>
      </div>
    </footer>
  );
}
