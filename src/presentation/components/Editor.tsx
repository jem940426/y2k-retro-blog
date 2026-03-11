'use client';

import { useRef } from 'react';
import { uploadMedia } from '@/application/useCases/post';

interface EditorProps {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const Editor = ({ contentRef }: EditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const execCmd = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Supabase Storage 업로드 진행
    const publicUrl = await uploadMedia(file);
    if (publicUrl) {
      if (file.type.startsWith('video/')) {
        const videoHtml = `<video controls src="${publicUrl}" style="max-width: 100%; object-fit: cover;"></video><br/>`;
        execCmd('insertHTML', videoHtml);
      } else {
        execCmd('insertImage', publicUrl);
      }
    } else {
      alert('미디어 업로드 실패!');
    }
    
    // input 초기화
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full flex flex-col border-2 border-[var(--color-y2k-border)] bg-white h-full max-h-[400px]">
      
      {/* 툴바 (Toolbar) */}
      <div className="flex flex-wrap gap-1 p-1 bg-[#ffe6f0] border-b-2 border-dashed border-[var(--color-y2k-pink-main)] text-[10px]">
        
        {/* 간단한 버튼들 */}
        <button type="button" onClick={() => execCmd('bold')} className="bg-[#e6ebf5] border-t-white border-l-white border-b-[#888] border-r-[#888] border px-2 py-1 font-bold">B</button>
        <button type="button" onClick={() => execCmd('italic')} className="bg-[#e6ebf5] border-t-white border-l-white border-b-[#888] border-r-[#888] border px-2 py-1 italic">I</button>
        <button type="button" onClick={() => execCmd('underline')} className="bg-[#e6ebf5] border-t-white border-l-white border-b-[#888] border-r-[#888] border px-2 py-1 underline">U</button>

        {/* 폰트 및 크기 */}
        <select onChange={(e) => execCmd('fontName', e.target.value)} className="bg-white border border-[#ccc] px-1 focus:outline-none">
          <option value="Galmuri11">갈무림 (픽셀)</option>
          <option value="Gulim">굴림 (클래식)</option>
          <option value="Arial">Arial</option>
        </select>
        <select onChange={(e) => execCmd('fontSize', e.target.value)} className="bg-white border border-[#ccc] px-1 focus:outline-none">
          <option value="3">보통 폰트</option>
          <option value="5">조금 큰 폰트</option>
          <option value="7">매우 큰 폰트</option>
        </select>

        {/* 글자색 설정 - html5 color picker */}
        <input 
          type="color" 
          onChange={(e) => execCmd('foreColor', e.target.value)} 
          className="w-6 h-6 p-0 border-0 cursor-pointer"
          title="T 색상 변경" 
        />
        
        {/* 미디어 업로드 버튼 */}
        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-[var(--color-y2k-pink-main)] border-t-[#ffd1dc] border-l-[#ffd1dc] border-b-[var(--color-y2k-pink-dark)] border-r-[var(--color-y2k-pink-dark)] border px-2 py-1 text-white font-bold ms-auto hover:bg-[var(--color-y2k-pink-dark)] focus:outline-none">
          📷 미디어 삽입 (Img/Video)
        </button>
        <input 
          type="file" 
          accept="image/*,video/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleImageUpload} 
        />
      </div>

      {/* 본문 에디터 (Editable Area) */}
      <div 
        ref={contentRef}
        className="flex-1 p-4 overflow-y-auto focus:outline-none text-[13px] leading-relaxed text-[#555] editor-content"
        contentEditable={true}
        suppressContentEditableWarning={true}
        style={{ minHeight: '250px' }}
      ></div>
    </div>
  );
};
