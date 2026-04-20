// === FILE: src/pages/LoginPage.tsx ===
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import type { Role } from '../store/authStore';

type RoleTab = { key: Role; label: string; email: string; redirect: string };
const ROLES: RoleTab[] = [
  { key:'user',    label:'User',    email:'user@fithabit.com',    redirect:'/user/dashboard'    },
  { key:'trainer', label:'Trainer', email:'trainer@fithabit.com', redirect:'/trainer/dashboard' },
  { key:'admin',   label:'Admin',   email:'admin@fithabit.com',   redirect:'/admin/dashboard'   },
];
const DEMO_USERS = {
  user:    { id:'u1', name:'Andi Pratama', email:'user@fithabit.com',    role:'user'    as Role, streak:7 },
  trainer: { id:'t1', name:'Marcus Reid',  email:'trainer@fithabit.com', role:'trainer' as Role, streak:0 },
  admin:   { id:'a1', name:'Admin Boss',   email:'admin@fithabit.com',   role:'admin'   as Role, streak:0 },
};
const QUOTES: Record<Role,{text:string;author:string}> = {
  user:    { text:'"Every champion was once a contender who refused to give up."', author:'— Rocky Balboa' },
  trainer: { text:'"A great coach believes in you before you believe in yourself."', author:'— Unknown' },
  admin:   { text:'"Data is the new oil. Analytics is the refinery."', author:'— Unknown' },
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [activeRole, setActiveRole] = useState<Role>('user');
  const [email, setEmail]       = useState('user@fithabit.com');
  const [password, setPassword] = useState('demo1234');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleRoleSwitch = (role: Role) => {
    setActiveRole(role);
    setEmail(ROLES.find(r => r.key === role)!.email);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const demo = DEMO_USERS[activeRole];
    if (email === demo.email && password === 'demo1234') {
      login(demo);
      navigate(ROLES.find(r => r.key === activeRole)!.redirect);
    } else {
      setError('Use password: demo1234');
    }
    setLoading(false);
  };

  const q = QUOTES[activeRole];

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT – Form */}
      <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:0.4}}
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-barlow font-extrabold text-xl uppercase text-text-primary">FitHabit</span>
        </div>
        <h1 className="font-barlow font-extrabold text-text-primary uppercase mb-2" style={{fontSize:'2.5rem',lineHeight:1.05}}>Welcome Back</h1>
        <p className="text-text-secondary font-inter mb-8 text-sm">Sign in and keep your streak alive.</p>

        {/* Role tabs */}
        <div className="flex bg-bg-section rounded-xl p-1 mb-8">
          {ROLES.map(r => (
            <button key={r.key} onClick={() => handleRoleSwitch(r.key)}
              className={`flex-1 py-2.5 text-sm font-inter font-semibold rounded-lg transition-all duration-200 ${
                activeRole===r.key ? 'bg-white text-accent shadow-card border border-border' : 'text-text-secondary hover:text-text-primary'
              }`}>
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="card-label mb-2 block">Email Address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input-base" required />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="card-label">Password</label>
              <a href="#" className="text-xs text-accent font-inter hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <input type={showPw?'text':'password'} value={password}
                onChange={e=>setPassword(e.target.value)} className="input-base pr-12" required />
              <button type="button" onClick={()=>setShowPw(s=>!s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text-secondary">
                {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-danger bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}
          <Button type="submit" size="lg" className="w-full justify-center" loading={loading}>
            Sign In <ArrowRight size={18}/>
          </Button>
        </form>

        <div className="mt-6 p-4 bg-accent-light rounded-xl border border-orange-100">
          <p className="text-xs font-inter text-accent font-semibold uppercase tracking-wider mb-1">Demo Credentials</p>
          <p className="text-xs font-inter text-text-secondary">Email: <span className="font-medium text-text-primary">{email}</span></p>
          <p className="text-xs font-inter text-text-secondary">Password: <span className="font-medium text-text-primary">demo1234</span></p>
        </div>
        <p className="mt-6 text-sm text-text-secondary text-center">
          No account? <a href="#" className="text-accent font-semibold hover:underline">Create one free</a>
        </p>
      </motion.div>

      {/* RIGHT – Orange panel */}
      <motion.div key={activeRole} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}}
        className="hidden lg:flex w-1/2 bg-accent flex-col items-center justify-center px-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-grain opacity-10"/>
        <div className="absolute bottom-0 right-0 font-barlow font-extrabold text-white/10 uppercase select-none" style={{fontSize:'12rem',lineHeight:1}}>FIT</div>
        <div className="relative z-10 max-w-sm text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Zap size={40} className="text-white" fill="white"/>
          </div>
          <blockquote className="font-barlow font-bold text-3xl uppercase leading-tight mb-4">{q.text}</blockquote>
          <p className="text-orange-200 font-inter text-sm">{q.author}</p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            {[{v:'180+',l:'Trainers'},{v:'2.4K',l:'Users'},{v:'98%',l:'Satisfaction'}].map(s=>(
              <div key={s.l}>
                <p className="font-barlow font-extrabold text-3xl">{s.v}</p>
                <p className="text-orange-200 text-xs font-inter mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
