import { useLang } from '../../i18n/LangContext';
import { Logo } from '../ui/Logo';

export function Footer() {
  const { tr } = useLang();

  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-[#6B7280]">{tr.rights}</p>
      </div>
    </footer>
  );
}
