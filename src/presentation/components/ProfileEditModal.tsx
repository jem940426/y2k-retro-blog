'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/application/useCases/profile';
import { addCategory, deleteCategory } from '@/application/useCases/category';
import { Profile } from '@/domain/models/Profile';
import { Category } from '@/domain/models/Category';

interface Props {
  profile: Profile | null;
  initialCategories: Category[];
  onClose: () => void;
}

export default function ProfileEditModal({ profile, initialCategories, onClose }: Props) {
  const router = useRouter();
  
  const [nickname, setNickname] = useState(profile?.nickname || '');
  const [tmi, setTmi] = useState(profile?.tmi || '');
  const [emoji, setEmoji] = useState(profile?.emoji || '🎀');
  
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('📁');

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    await updateProfile(nickname, tmi, emoji);
    setIsLoading(false);
    router.refresh(); // 변경사항 반영
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    setIsLoading(true);
    const { success } = await addCategory(newCatName, newCatIcon);
    if (success) {
      setNewCatName('');
      setNewCatIcon('📁');
      // 임시로 화면에서 바로 추가 (refresh 전)
      setCategories([...categories, { id: Date.now().toString(), name: newCatName, icon: newCatIcon, created_at: new Date().toISOString() }]);
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleDeleteCategory = async (id: string) => {
    setIsLoading(true);
    const { success } = await deleteCategory(id);
    if (success) {
      setCategories(categories.filter(c => c.id !== id));
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-[400px] bg-[var(--color-y2k-pink-bg)] p-1 rounded-sm shadow-[4px_4px_0px_0px_rgba(255,102,163,0.3)] max-h-[90vh] flex flex-col">
        <div className="w-full bg-[#fdfafb] border-2 border-[var(--color-y2k-border)] flex flex-col flex-1 overflow-hidden">
          
          {/* 타이틀 바 */}
          <div className="bg-[var(--color-y2k-pink-main)] px-2 py-1.5 flex justify-between items-center select-none shrink-0">
            <span className="font-bold text-[10px] text-white tracking-widest leading-none drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">Profile_Setting.exe</span>
            <button onClick={onClose} className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white">X</button>
          </div>

          <div className="p-4 overflow-y-auto flex-1 text-[11px] text-[#555] flex flex-col gap-4">
            
            {/* 프로필 수정 영역 */}
            <div className="border border-dashed border-[#ff99cc] p-3">
              <h3 className="font-bold text-[var(--color-y2k-pink-dark)] mb-2">🎈 프로필 설정</h3>
              <div className="flex flex-col gap-2">
                <input 
                  type="text" value={emoji} onChange={e => setEmoji(e.target.value)}
                  placeholder="이모지 (예: 🎀)"
                  className="border border-[#e6ccda] p-1 focus:outline-none focus:border-[var(--color-y2k-pink-main)]"
                />
                <input 
                  type="text" value={nickname} onChange={e => setNickname(e.target.value)}
                  placeholder="닉네임"
                  className="border border-[#e6ccda] p-1 focus:outline-none focus:border-[var(--color-y2k-pink-main)]"
                />
                <input 
                  type="text" value={tmi} onChange={e => setTmi(e.target.value)}
                  placeholder="오늘의 TMI 상태메시지"
                  className="border border-[#e6ccda] p-1 focus:outline-none focus:border-[var(--color-y2k-pink-main)]"
                />
                <button 
                  onClick={handleSaveProfile} disabled={isLoading}
                  className="bg-[#ff99cc] text-white font-bold p-1 border-2 border-t-[#ffd1dc] border-l-[#ffd1dc] border-b-[var(--color-y2k-pink-dark)] border-r-[var(--color-y2k-pink-dark)] mt-1"
                >
                  프로필 저장
                </button>
              </div>
            </div>

            {/* 카테고리 수정 영역 */}
            <div className="border border-dashed border-[#ff99cc] p-3">
              <h3 className="font-bold text-[var(--color-y2k-pink-dark)] mb-2">📁 폴더 설정</h3>
              
              <ul className="flex flex-col gap-1 mb-3">
                {categories.map(cat => (
                  <li key={cat.id} className="flex items-center justify-between bg-white border border-[#ffe6f0] p-1">
                    <span>{cat.icon} {cat.name}</span>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 font-bold px-1 hover:bg-red-50">X</button>
                  </li>
                ))}
              </ul>

              <div className="flex gap-1">
                <input 
                  type="text" value={newCatIcon} onChange={e => setNewCatIcon(e.target.value)}
                  className="border border-[#e6ccda] p-1 w-[30px] text-center focus:outline-none focus:border-[var(--color-y2k-pink-main)]"
                />
                <input 
                  type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)}
                  placeholder="새 폴더명"
                  className="border border-[#e6ccda] p-1 flex-1 focus:outline-none focus:border-[var(--color-y2k-pink-main)]"
                />
                <button 
                  onClick={handleAddCategory} disabled={isLoading}
                  className="bg-white border border-[#ccc] px-2 font-bold hover:bg-[#ffe6f0]"
                >
                  추가
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
