'use client';

import React, { useEffect } from 'react';

/**
 * ImageModal 컴포넌트 프롭스 인터페이스
 */
interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

/**
 * 블로그 포스트의 이미지를 확대해서 보여주는 모달 컴포넌트
 * Y2K 레트로 스타일의 윈도우 UI를 제공합니다.
 */
export const ImageModal = ({ imageUrl, onClose }: ImageModalProps) => {
  // 모달이 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // ESC 키를 누르면 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* 윈도우 스타일 컨테이너 */}
      <div 
        className="relative bg-[var(--color-y2k-pink-bg)] p-1 rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] max-w-full max-h-full flex flex-col"
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
      >
        {/* 타이틀 바 */}
        <div className="bg-[var(--color-y2k-pink-main)] px-3 py-1.5 flex justify-between items-center select-none mb-1">
          <span className="font-bold text-[11px] text-white tracking-widest leading-none drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)] flex items-center gap-2">
             🖼️ Image_Viewer.exe
          </span>
          <button 
            onClick={onClose}
            className="w-5 h-5 bg-[#ffe6f0] border-2 border-t-white border-l-white border-b-[var(--color-y2k-pink-dark)] border-r-[var(--color-y2k-pink-dark)] flex items-center justify-center font-black text-[10px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white active:border-t-[var(--color-y2k-pink-dark)] active:border-l-[var(--color-y2k-pink-dark)] active:border-b-white active:border-r-white transition-all cursor-pointer"
          >
            X
          </button>
        </div>

        {/* 이미지 영역 */}
        <div className="bg-[#fdfafb] border-2 border-[var(--color-y2k-border)] overflow-hidden flex items-center justify-center min-w-[200px] min-h-[100px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageUrl} 
            alt="Expanded view" 
            className="max-w-full max-h-[80vh] object-contain block"
          />
        </div>

        {/* 하단 바 (장식용) */}
        <div className="mt-1 flex justify-end">
           <span className="text-[9px] text-[var(--color-y2k-pink-dark)] font-bold opacity-70 italic px-2">
             Y2K Retro Viewer v1.0
           </span>
        </div>
      </div>
    </div>
  );
};
