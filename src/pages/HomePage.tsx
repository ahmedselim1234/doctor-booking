import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, Bone, Sparkles, Baby, Eye, Brain, Salad, Ear,
  Users, Award, Stethoscope,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PageWrapper } from '../components/layout/PageWrapper';
import { DoctorCard } from '../components/doctors/DoctorCard';
import { useLang } from '../i18n/LangContext';
import { Specialty } from '../types';
import { doctors } from '../data/doctors';

const specialtyIcons: Record<Specialty, React.ReactNode> = {
  cardiology: <Heart size={28} />,
  orthopedics: <Bone size={28} />,
  dermatology: <Sparkles size={28} />,
  pediatrics: <Baby size={28} />,
  ophthalmology: <Eye size={28} />,
  neurology: <Brain size={28} />,
  gastroenterology: <Salad size={28} />,
  ent: <Ear size={28} />,
};

const specialtyKeys = Object.keys(specialtyIcons) as Specialty[];
const featuredDoctors = doctors.slice(0, 6);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export function HomePage() {
  const navigate = useNavigate();
  const { tr } = useLang();

  const stats = [
    { icon: <Stethoscope size={24} />, value: '50+', label: tr.stat1 },
    { icon: <Users size={24} />, value: '10,000+', label: tr.stat2 },
    { icon: <Award size={24} />, value: '8', label: tr.stat3 },
  ];

  return (
    <PageWrapper className="px-0 py-0">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl md:text-5xl font-bold leading-tight">
            {tr.heroTitle}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="text-lg text-white/80 max-w-xl">
            {tr.heroSub}
          </motion.p>
          <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
            <Button size="lg" variant="outline"
              className="!border-white !text-white hover:!bg-white hover:!text-[#1D9E75]"
              onClick={() => navigate('/doctors')}>
              {tr.heroCta}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Specialties */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-2xl font-bold text-center text-[#1a1a1a] mb-10">
          {tr.browseSpecialties}
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {specialtyKeys.map((specialty, i) => (
            <motion.button key={specialty} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={i * 0.05} variants={fadeUp}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/doctors?specialty=${specialty}`)}
              className="flex flex-col items-center gap-3 bg-white border border-[#E5E7EB] rounded-xl p-5 cursor-pointer hover:border-[#1D9E75] transition-all group">
              <span className="text-[#1D9E75] group-hover:scale-110 transition-transform">
                {specialtyIcons[specialty]}
              </span>
              <span className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#1D9E75]">
                {tr.specialtyLabels[specialty]}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-[#1a1a1a]">{tr.featuredDoctors}</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/doctors')}>{tr.viewAll}</Button>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredDoctors.map((doctor, i) => (
            <motion.div key={doctor.id} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={i * 0.07} variants={fadeUp}>
              <DoctorCard doctor={doctor} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-[#E5E7EB] py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              custom={i * 0.1} variants={fadeUp}
              className="flex flex-col items-center gap-2 text-center">
              <span className="text-[#1D9E75]">{stat.icon}</span>
              <span className="text-3xl font-bold text-[#1a1a1a]">{stat.value}</span>
              <span className="text-[#6B7280]">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
