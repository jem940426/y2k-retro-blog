'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@/presentation/components/Editor';
import { savePost } from '@/application/useCases/post';
import { getCategories } from '@/application/useCases/category';
import { Category } from '@/domain/models/Category';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [emoji, setEmoji] = useState('📝');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data);
      if (data.length > 0) {
        setCategory(data[0].name);
      }
    });
  }, []);

  const handlePublish = async () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요!');
      return;
    }

    const htmlContent = contentRef.current?.innerHTML || '';
    if (!htmlContent.trim() || htmlContent === '<br>') {
      alert('본문 내용을 입력해주세요!');
      return;
    }

    setIsSubmitting(true);
    
    // Supabase에 저장
    const { error } = await savePost(title, htmlContent, category, emoji);
    
    setIsSubmitting(false);

    if (error) {
      alert('글 저장에 실패했습니다: ' + error.message);
    } else {
      alert('성공적으로 발행되었습니다! ♥');
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-8">
      {/* 장식 요소들 */}
      <div className="absolute top-[10%] left-[10%] text-[var(--color-y2k-pink-main)] text-3xl rotate-[-20deg] drop-shadow-sm">✿</div>
      <div className="absolute top-[5%] right-[20%] text-[var(--color-y2k-pink-main)] text-2xl drop-shadow-sm">✦</div>
      <div className="absolute bottom-[10%] left-[25%] text-[var(--color-y2k-pink-dark)] text-3xl rotate-[15deg] drop-shadow-sm">💖</div>

      {/* 글쓰기 메인 윈도우 */}
      <div className="w-[750px] bg-[var(--color-y2k-pink-bg)] p-1 rounded-sm shadow-[8px_8px_0px_0px_rgba(255,102,163,0.4)] z-20">
        <div className="w-full bg-[#fdfafb] border-2 border-[var(--color-y2k-border)] flex flex-col h-[650px]">
          
          {/* 타이틀 바 */}
          <div className="bg-[var(--color-y2k-pink-main)] px-2 py-1.5 flex justify-between items-center select-none">
            <span className="font-bold text-[10px] text-white tracking-widest leading-none drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">Write.exe - 새 블로그 글 작성</span>
            <div className="flex gap-1">
              <button onClick={() => router.push('/')} className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white cursor-pointer">X</button>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1 pb-4">
            <h1 className="text-xl font-bold text-[var(--color-y2k-pink-dark)] mb-4 tracking-[0.1em] drop-shadow-[1px_1px_0px_rgba(255,204,229,1)] flex items-center gap-2">
              <span>✏️</span> 뉴 다이어리 작성 <span>♥</span>
            </h1>

            {/* 입력 폼 헤더 (제목, 카테고리, 이모지) */}
            <div className="flex bg-[#fff0f5] border-2 border-[var(--color-y2k-border)] p-3 mb-4 gap-3 shadow-[inset_1px_1px_0px_white,inset_-1px_-1px_0px_#e6ccda]">
              
              {/* 이모지 선택 */}
              <div className="flex flex-col gap-1 w-[60px]">
                <label className="text-[9px] font-bold text-[var(--color-y2k-pink-dark)]">아이콘</label>
                <input 
                  type="text" 
                  value={emoji} 
                  onChange={(e) => setEmoji(e.target.value)} 
                  maxLength={2} 
                  className="w-full text-center border-2 border-[#e6ccda] p-1 text-lg bg-white focus:outline-none focus:border-[var(--color-y2k-pink-main)]"
                />
              </div>

              {/* 제목 입력 */}
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[9px] font-bold text-[var(--color-y2k-pink-dark)]">제목</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="오늘의 재미있는 일을 적어볼까? (｡♥‿♥｡)" 
                  className="w-full border-2 border-[#e6ccda] p-1.5 text-[12px] bg-white text-[#555] font-bold focus:outline-none focus:border-[var(--color-y2k-pink-main)]"
                />
              </div>

              {/* 카테고리 선택 */}
              <div className="flex flex-col gap-1 w-[160px]">
                <label className="text-[9px] font-bold text-[var(--color-y2k-pink-dark)]">카테고리 폴더</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full border-2 border-[#e6ccda] p-1.5 text-[11px] bg-white text-[#555] focus:outline-none focus:border-[var(--color-y2k-pink-main)] cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                  {categories.length === 0 && <option value="">카테고리 없음</option>}
                </select>
              </div>
            </div>

            {/* 본문 에디터 (WYSIWYG) */}
            <div className="flex-1 mb-4 relative z-0 min-h-0 bg-white">
              <Editor contentRef={contentRef} />
            </div>

            {/* 하단 푸터 및 발생 버튼 */}
            <div className="pt-3 border-t-2 border-dashed border-[var(--color-y2k-pink-main)] flex justify-between items-center">
              <span className="text-[9px] font-bold text-[#888] tracking-widest bg-[#ffe6f0] px-2 py-1">Mode: Admin Writing</span>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => router.push('/')} 
                  className="bg-[#e6ebf5] border-t-white border-l-white border-b-[#888] border-r-[#888] border-2 px-6 py-2 text-[11px] font-bold text-[#555] active:border-t-[#888] active:border-l-[#888] active:border-b-white active:border-r-white hover:bg-white"
                >
                  취소 ✖
                </button>
                <button 
                  onClick={handlePublish} 
                  disabled={isSubmitting}
                  className="bg-[#ff99cc] border-t-[#ffd1dc] border-l-[#ffd1dc] border-b-[var(--color-y2k-pink-dark)] border-r-[var(--color-y2k-pink-dark)] border-2 px-8 py-2 text-[11px] font-bold text-white shadow-inner active:border-t-[var(--color-y2k-pink-dark)] active:border-l-[var(--color-y2k-pink-dark)] active:border-b-[#ffd1dc] active:border-r-[#ffd1dc] hover:brightness-110 disabled:opacity-50"
                >
                  {isSubmitting ? '저장 중...' : '발행하기 ♥'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
