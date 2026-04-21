import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { 
  Zap, ArrowRight, Shield, Activity
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const portalData = useQuery(api.analytics.getPublicPortalData);
  
  const statsList = [
    { val: portalData?.athleteCount || '15', label: 'Athletes' },
    { val: portalData?.trainerCount || '3', label: 'Elite Trainers' },
    { val: portalData?.retention || '98%', label: 'Retention' },
    { val: portalData?.uptime || '100% Sync', label: 'Performance' },
  ];

  return (
    <div className="min-h-screen bg-bg-deep text-text-main font-inter selection:bg-accent/30 selection:text-white overflow-x-hidden bg-mesh scroll-smooth">
      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-glass backdrop-blur-xl border-b border-border-glass">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/20">
              <Zap size={24} className="text-white" fill="white" />
            </div>
            <span className="font-bold text-2xl tracking-tighter uppercase font-barlow italic text-white">FitHabit <span className="text-accent">Trainer</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Trainers', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-soft hover:text-white transition-all">
                {item}
              </a>
            ))}
            <button 
              onClick={() => navigate('/login')}
              className="btn-primary py-3 px-8 text-[10px] uppercase tracking-[0.2em]"
            >
              System Entry
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-64 pb-32 px-8 overflow-hidden">
        {/* Spotlight Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-accent/20 rounded-full blur-[160px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="inline-block px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-12">
              Elite Performance Infrastructure
            </span>
            <h1 className="heading-xl text-gradient mb-10 max-w-5xl mx-auto font-barlow italic uppercase">
              Train with Precision.<br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Build Excellence.</span>
            </h1>
            <p className="max-w-3xl mx-auto text-text-soft text-xl mb-14 leading-relaxed font-light">
              Enter the future of high-performance development. FitHabit Trainer merges professional human coaching with data-driven architecture to optimize your session success.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto btn-primary py-6 px-12 text-sm uppercase tracking-[0.3em] group"
              >
                Start Evolution <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#features"
                className="w-full sm:w-auto btn-glass py-6 px-12 text-[10px] uppercase tracking-[0.2em] border border-white/10 flex items-center justify-center"
              >
                View Infrastructure
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="py-24 border-y border-border-glass bg-white/[0.02] px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
            {statsList.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center lg:items-start"
              >
                <span className="text-5xl font-extrabold text-white font-barlow tracking-tight mb-2 italic">{stat.val}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="py-40 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-10">
            <div className="max-w-2xl">
              <div className="w-16 h-1.5 bg-accent rounded-full mb-8" />
              <h2 className="heading-lg text-gradient italic uppercase font-barlow">Built for the Top 1%.</h2>
              <p className="text-text-soft mt-6 text-lg font-light leading-relaxed">
                We've stripped away the noise. Only the core performance metrics that matter to your daily habit success remain.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Activity className="text-accent" />, 
                title: 'Diagnostic Coaching', 
                desc: 'Precise Session tracking with real-time feedback loops from your elite trainers.' 
              },
              { 
                icon: <Zap className="text-indigo-400" />, 
                title: 'Atomic Architecture', 
                desc: 'Custom habit design powered by success heatmaps and peak performance analysis.' 
              },
              { 
                icon: <Shield className="text-emerald-400" />, 
                title: 'Data Sovereignty', 
                desc: 'Premium security for your health metrics. Your evolution is strictly private.' 
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card group hover:bg-white/[0.06] hover:border-white/20"
              >
                <div className="w-16 h-16 bg-black/20 rounded-2xl flex items-center justify-center mb-10 border border-white/5 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 uppercase font-barlow italic tracking-wide">{f.title}</h3>
                <p className="text-text-soft text-sm leading-relaxed font-light">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINERS SECTION ── */}
      <section id="trainers" className="py-40 px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="heading-lg text-gradient italic uppercase font-barlow mb-4">Elite Coaching Staff.</h2>
            <p className="text-text-soft text-lg font-light">Certified experts dedicated to your physical evolution.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: 'Marcus Reid', role: 'Head of Strength', tags: ['Hypertrophy', 'Biomechanics'] },
              { name: 'Sofia Reyes', role: 'HIIT Specialist', tags: ['V02 Max', 'Fat Loss'] },
              { name: 'Jake Torres', role: 'Nutritional Bio-hacker', tags: ['Keto', 'Recomposition'] },
            ].map((t, i) => (
              <div key={i} className="glass rounded-[2rem] p-10 border border-white/5 hover:border-accent/40 transition-all text-center">
                <div className="w-24 h-24 bg-accent/20 rounded-full mx-auto mb-8 flex items-center justify-center text-accent text-3xl font-black italic">
                   {t.name[0]}
                </div>
                <h4 className="text-xl font-bold text-white uppercase font-barlow italic mb-2">{t.name}</h4>
                <p className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">{t.role}</p>
                <div className="flex flex-wrap justify-center gap-2">
                   {t.tags.map(tag => (
                     <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-bold text-text-soft uppercase tracking-widest">{tag}</span>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section id="pricing" className="py-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
             <div className="lg:w-1/3">
                <h2 className="heading-lg text-gradient italic uppercase font-barlow mb-8 leading-[1.1]">Clear Investment.<br/>No Noise.</h2>
                <p className="text-text-soft text-lg font-light leading-relaxed mb-10">Choose the tier that matches your commitment level. Every plan includes full database logging access.</p>
                <ul className="space-y-4">
                   {['Live Trainer Support', 'Habit Heatmapping', 'Sync Across 3 Devices', 'Priority Support'].map(check => (
                     <li key={check} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
                        <Zap size={14} className="text-accent" fill="currentColor" /> {check}
                     </li>
                   ))}
                </ul>
             </div>
             <div className="lg:w-2/3 grid md:grid-cols-2 gap-8 w-full">
                <div className="glass-card p-12 border-white/5 relative overflow-hidden">
                   <p className="text-[10px] font-bold text-text-light uppercase tracking-[0.4em] mb-8 opacity-40">Standard Protocol</p>
                   <h3 className="text-5xl font-black italic text-white font-barlow mb-10 uppercase">$49 <span className="text-sm font-light text-text-soft lowercase tracking-normal">/mo</span></h3>
                   <p className="text-sm text-text-soft font-light mb-12">Essential infrastructure for daily habit tracking and trainer access.</p>
                   <button onClick={() => navigate('/login')} className="w-full btn-glass py-5 text-[10px] uppercase font-bold tracking-[0.3em]">Initialize</button>
                </div>
                <div className="glass-card p-12 border-accent/40 bg-accent/5 relative overflow-hidden ring-1 ring-accent/20">
                   <div className="absolute top-8 right-8 bg-accent text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-accent/40">Elite</div>
                   <p className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-8">Performance Peak</p>
                   <h3 className="text-5xl font-black italic text-white font-barlow mb-10 uppercase">$99 <span className="text-sm font-light text-text-soft lowercase tracking-normal">/mo</span></h3>
                   <p className="text-sm text-text-soft font-light mb-12">Unrestricted access to all trainers and deep data intelligence.</p>
                   <button onClick={() => navigate('/login')} className="w-full btn-primary py-5 text-[10px] uppercase font-bold tracking-[0.3em]">Go Pro</button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-40 px-8">
        <div className="max-w-6xl mx-auto glass rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-[0_0_100px_rgba(99,102,241,0.15)] border-white/10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px] pointer-events-none" />
          <h2 className="text-5xl md:text-8xl font-extrabold italic uppercase font-barlow tracking-tighter text-white mb-12 relative z-10 leading-none text-gradient">
            Rewrite Your<br/>Performance.
          </h2>
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary py-6 px-16 text-sm uppercase tracking-[0.4em] relative z-10 scale-110"
          >
            Create Your Account
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-24 px-8 border-t border-border-glass bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Zap size={24} className="text-accent" fill="currentColor" />
              <span className="font-bold text-2xl uppercase font-barlow italic text-white tracking-widest leading-none">FitHabit</span>
            </div>
            <p className="text-sm text-text-soft font-light leading-relaxed">
              Engineering consistency through data-driven habit architecture. Forging elite athletes globally.
            </p>
          </div>
          
          {[
            { title:'Infrastructure',  items:['Core Engine','Security','Privacy','Log'] },
            { title:'Resources',       items:['Performance Guide','Elite Trainers','Support'] },
            { title:'Legal',           items:['Terms','Privacy Policy','Cookies'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[10px] font-bold text-white uppercase tracking-[0.4em] mb-10">{col.title}</p>
              <ul className="space-y-5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[10px] font-bold text-text-soft uppercase tracking-[0.2em] hover:text-white transition-all opacity-40 hover:opacity-100">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-border-glass text-[9px] font-bold text-text-muted uppercase tracking-[0.5em] text-center">
          © 2026 FitHabit Trainer Infrastructure. Built for the Elite.
        </div>
      </footer>
    </div>
  );
};
