// === FILE: src/pages/LandingPage.tsx ===
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Zap, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockTrainers } from '../data/mockData';

const STATS = [
  { value: '2,400+', label: 'Active Users' },
  { value: '180',    label: 'Expert Trainers' },
  { value: '98%',    label: 'Satisfaction Rate' },
  { value: '50K+',   label: 'Sessions Booked' },
];

const FEATURES = [
  { icon: <Calendar size={28} />, title: 'Smart Booking',    desc: 'Book elite certified trainers in under 60 seconds. Real-time availability, instant confirmation.' },
  { icon: <TrendingUp size={28} />, title: 'Habit Intelligence', desc: 'AI-powered habit engine learns your peak performance window and auto-schedules sessions for you.' },
  { icon: <Zap size={28} />, title: 'Progress Tracking',   desc: 'Full history, streak counters, and performance analytics to keep you accountable every day.' },
];

const STEPS = [
  { n: '01', title: 'Choose Your Trainer', desc: 'Browse 180+ certified specialists filtered by workout type, rating, and availability.' },
  { n: '02', title: 'Pick Your Slot',      desc: 'Select the date and time that fits your schedule from real-time availability.' },
  { n: '03', title: 'Train & Build Habits',desc: 'Show up, crush the session, and let FitHabit turn it into a lasting routine.' },
];

const CountUp: React.FC<{ target: string }> = ({ target }) => {
  const num = parseInt(target.replace(/\D/g, ''));
  const suffix = target.replace(/[\d,]/g, '');
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current || isNaN(num)) return;
    ref.current = true;
    let s = 0;
    const step = num / 60;
    const t = setInterval(() => {
      s += step;
      if (s >= num) { setVal(num); clearInterval(t); } else setVal(Math.floor(s));
    }, 20);
    return () => clearInterval(t);
  }, [num]);
  if (isNaN(num)) return <>{target}</>;
  return <>{val.toLocaleString()}{suffix}</>;
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-barlow font-extrabold text-xl uppercase text-text-primary tracking-wide">FitHabit</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-inter font-medium text-text-secondary">
            {['Trainers','Features','Pricing','About'].map((l) => (
              <a key={l} href="#" className="hover:text-accent transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Log In</Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/login')}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Orange diagonal shape */}
        <div
          className="absolute right-0 top-0 h-full w-[52%] bg-accent clip-diagonal"
          style={{ clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        >
          {/* grain texture overlay */}
          <div className="absolute inset-0 opacity-5 bg-hero-grain" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-orange-700 opacity-90" />
          {/* Bold decorative text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="font-barlow font-extrabold text-white uppercase"
              style={{ fontSize: 'clamp(80px,15vw,180px)', lineHeight:1, writingMode:'vertical-rl', transform:'rotate(180deg)' }}>
              TRAIN
            </span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* LEFT */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}>
            <div className="inline-flex items-center gap-2 bg-accent-light text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🔥 The #1 Fitness Booking Platform
            </div>
            <h1 className="font-barlow font-extrabold uppercase text-text-primary mb-6"
              style={{ fontSize:'clamp(3rem,6vw,5.5rem)', lineHeight:1.0, letterSpacing:'-0.01em' }}>
              Train Harder.<br />
              <span className="text-gradient-orange">Build Habits.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-md">
              Book elite certified trainers, track your streaks, and let our smart habit engine keep you consistent — for life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate('/login')}>
                Get Started <ArrowRight size={18} />
              </Button>
              <Button variant="ghost" size="lg">
                <Play size={16} className="fill-accent" /> Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-2">
                {['MR','SR','JT','PS'].map((i, idx) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-accent border-2 border-white flex items-center justify-center text-white text-xs font-barlow font-bold" style={{ zIndex: 4-idx }}>
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-accent-2 fill-accent-2" />)}
                </div>
                <p className="text-xs text-text-secondary mt-0.5">Loved by 2,400+ athletes</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — floating cards */}
          <motion.div
            initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, delay:0.2 }}
            className="relative hidden lg:flex items-center justify-center h-[520px]"
          >
            <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-card-hover p-5 w-64 z-10">
              <p className="card-label mb-2">Next Session</p>
              <p className="font-barlow font-bold text-xl text-text-primary">Marcus Reid</p>
              <p className="text-sm text-text-secondary">Strength · Today 17:00</p>
              <div className="mt-3 h-2 bg-bg-section rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-accent rounded-full" />
              </div>
            </div>
            <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-card-hover p-4 w-52 z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🔥</span>
                <p className="font-barlow font-extrabold text-3xl text-accent">21</p>
              </div>
              <p className="text-xs text-text-secondary font-inter">Day Streak — Personal Best!</p>
            </div>
            <div className="absolute top-24 left-0 bg-white rounded-2xl shadow-card-hover p-4 w-44 z-10">
              <p className="text-xs text-text-secondary font-inter mb-1">This Week</p>
              <p className="font-barlow font-extrabold text-4xl text-text-primary">5 <span className="text-accent">/ 5</span></p>
              <p className="text-xs text-success mt-1 flex items-center gap-1">✓ Goal Achieved</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-text-primary py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <motion.div key={s.label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <p className="font-barlow font-extrabold text-accent" style={{ fontSize:'3.5rem', lineHeight:1 }}>
                <CountUp target={s.value} />
              </p>
              <p className="text-sidebar-text font-inter text-sm mt-2 uppercase tracking-widest">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="card-label text-accent mb-3">WHY FITHABIT</p>
            <h2 className="section-title text-text-primary" style={{ fontSize:'2.5rem' }}>
              Everything you need to <span className="text-accent">stay consistent</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.1 }}
                className="bg-white rounded-2xl border border-border shadow-card p-8 hover:shadow-card-hover hover:border-accent transition-all duration-200"
              >
                <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center text-accent mb-5">
                  {f.icon}
                </div>
                <h3 className="font-barlow font-bold text-2xl text-text-primary uppercase mb-3">{f.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="card-label text-accent mb-3">HOW IT WORKS</p>
            <h2 className="section-title text-text-primary" style={{ fontSize:'2.5rem' }}>Three steps to transformation</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-0.5 bg-border" />
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.15 }}
                className="text-center px-4"
              >
                <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6 relative">
                  <span className="font-barlow font-extrabold text-white text-3xl">{step.n}</span>
                </div>
                <h3 className="font-barlow font-bold text-xl text-text-primary uppercase mb-3">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINER SPOTLIGHT ── */}
      <section className="py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="card-label text-accent mb-2">MEET THE TEAM</p>
              <h2 className="section-title text-text-primary" style={{ fontSize:'2.5rem' }}>Elite Trainers</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              View All <ChevronRight size={16} />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {mockTrainers.slice(0, 6).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.08 }}
                className="bg-white rounded-2xl border border-border shadow-card p-5 min-w-[200px] hover:border-accent hover:shadow-card-hover transition-all duration-200 shrink-0"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-white font-barlow font-bold text-xl mb-4">
                  {t.initials}
                </div>
                <p className="font-barlow font-bold text-lg text-text-primary leading-tight">{t.name}</p>
                <p className="text-xs text-accent font-semibold mt-1">{t.specialty}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star size={12} className="text-accent-2 fill-accent-2" />
                  <span className="text-xs font-inter font-semibold text-text-primary">{t.rating}</span>
                </div>
                <p className="text-xs text-text-light mt-1">{t.sessions} sessions</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-accent py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-grain opacity-5" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="font-barlow font-extrabold uppercase text-white mb-6"
            style={{ fontSize:'clamp(2.5rem,5vw,4.5rem)', lineHeight:1.05 }}
          >
            Start your journey today
          </motion.h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Join 2,400+ athletes who stopped making excuses and started building habits that last.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="!border-white !text-white hover:!bg-white hover:!text-accent"
            onClick={() => navigate('/login')}
          >
            Create Free Account <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-sidebar-bg text-sidebar-text py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-white" fill="white" />
              </div>
              <span className="font-barlow font-extrabold text-white text-xl uppercase">FitHabit</span>
            </div>
            <p className="text-sm leading-relaxed opacity-70">Train harder. Build lasting habits with elite certified trainers.</p>
          </div>
          {[
            { title:'Product',  items:['Features','Pricing','Trainers','Enterprise'] },
            { title:'Company',  items:['About','Blog','Careers','Press'] },
            { title:'Support',  items:['Help Center','Contact','Privacy','Terms'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-barlow font-bold text-white text-lg uppercase mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item}><a href="#" className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-sm opacity-50 text-center">
          © 2026 FitHabit Trainer. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
