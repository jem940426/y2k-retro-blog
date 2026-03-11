'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPassword } from '@/application/useCases/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorObj, setErrorObj] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorObj(null);
    
    const { error } = await signInWithPassword(email, password);
    
    if (error) {
      setErrorObj('로그인 실패: ' + error.message);
    } else {
      router.push('/write');
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-8">
      {/* 장식 요소들 */}
      <div className="absolute top-[20%] left-[30%] text-[var(--color-y2k-pink-main)] text-2xl rotate-12 drop-shadow-sm">✦</div>
      <div className="absolute bottom-[20%] right-[30%] text-[var(--color-y2k-pink-dark)] text-2xl rotate-[-15deg] drop-shadow-sm">💖</div>

      <div className="w-[320px] bg-[var(--color-y2k-pink-bg)] p-1 rounded-sm shadow-[4px_4px_0px_0px_rgba(255,102,163,0.3)] z-20">
        <div className="w-full bg-[#fdfafb] border-2 border-[var(--color-y2k-border)] flex flex-col">
          
          {/* 타이틀 바 */}
          <div className="bg-[var(--color-y2k-pink-main)] px-2 py-1.5 flex justify-between items-center select-none">
            <span className="font-bold text-[10px] text-white tracking-widest leading-none drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">Login.exe</span>
            <div className="flex gap-1">
              <button className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white">X</button>
            </div>
          </div>

          <div className="p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#ffd1dc] border-2 border-[var(--color-y2k-pink-main)] flex items-center justify-center text-3xl mb-4 shadow-[2px_2px_0px_0px_rgba(255,153,204,1)]">
              🔒
            </div>
            <h2 className="font-bold text-[14px] text-[var(--color-y2k-pink-dark)] mb-4 tracking-wider">관리자 접속 (Admin)</h2>
            
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email... (｡♥‿♥｡)" 
                className="border-2 border-[#e6ccda] p-2 text-[11px] text-[#555] bg-white focus:outline-none focus:border-[var(--color-y2k-pink-main)] w-full"
                required 
              />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password... 🤫" 
                className="border-2 border-[#e6ccda] p-2 text-[11px] text-[#555] bg-white focus:outline-none focus:border-[var(--color-y2k-pink-main)] w-full"
                required 
              />
              {errorObj && <div className="text-[10px] text-red-500 font-bold text-center mt-1">{errorObj}</div>}
              <button 
                type="submit" 
                className="mt-2 bg-[#ff99cc] border-t-[#ffd1dc] border-l-[#ffd1dc] border-b-[var(--color-y2k-pink-dark)] border-r-[var(--color-y2k-pink-dark)] border-2 px-4 py-2 text-[11px] font-bold text-white shadow-inner active:border-t-[var(--color-y2k-pink-dark)] active:border-l-[var(--color-y2k-pink-dark)] active:border-b-[#ffd1dc] active:border-r-[#ffd1dc]"
              >
                접속하기 ♥
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
