import Link from 'next/link';
import { Post } from '@/domain/models/Post';

interface PostDetailProps {
  post: Post;
}

export const PostDetail = ({ post }: PostDetailProps) => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10 md:py-0 relative z-10 px-4 md:px-8">
      {/* 장식 요소들 */}
      <div className="absolute top-[15%] left-[20%] text-[var(--color-y2k-pink-main)] text-3xl rotate-12 drop-shadow-sm">✦</div>
      <div className="absolute top-[10%] right-[30%] text-[var(--color-y2k-pink-main)] text-4xl drop-shadow-sm">✿</div>

      {/* 오른쪽: 메인 피드 윈도우 (게시글 상세 정보 창) */}
      <div className="w-[600px] bg-[var(--color-y2k-pink-bg)] p-1 rounded-sm shadow-[6px_6px_0px_0px_rgba(255,102,163,0.4)] z-10">
        <div className="w-full bg-[#fdfafb] border-2 border-[var(--color-y2k-border)] flex flex-col min-h-[500px]">
          
          {/* 타이틀 바 */}
          <div className="bg-[var(--color-y2k-pink-main)] px-2 py-1.5 flex justify-between items-center select-none">
            <span className="font-bold text-[10px] text-white tracking-widest leading-none drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">Post_View.exe - {post.title}</span>
            <div className="flex gap-1">
              <button className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white">-</button>
              <button className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white">□</button>
              <Link href="/">
                <button className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white cursor-pointer">X</button>
              </Link>
            </div>
          </div>

          <div className="p-8 flex flex-col flex-1">
             {/* 게시글 헤더 영역 */}
             <div className="border-b-2 border-dashed border-[#e6ccda] pb-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-12 h-12 bg-[#fff0f5] border border-[var(--color-y2k-pink-bg)] flex items-center justify-center text-2xl">
                     {post.emoji}
                   </div>
                   <h1 className="text-[16px] font-bold text-[var(--color-y2k-pink-dark)] tracking-wide">{post.title}</h1>
                </div>
                <div className="flex justify-end">
                   <span className="text-[9px] font-bold text-[#888] tracking-widest">Date: {post.date}</span>
                </div>
             </div>

             {/* 게시글 본문 */}
             <div 
                className="flex-1 text-[13px] text-[#555] leading-[2] whitespace-pre-wrap font-medium overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: post.content }}
             >
             </div>

             {/* Action 영역 */}
             <div className="mt-8 flex justify-center border-t border-[var(--color-y2k-pink-main)] border-dashed pt-4">
               <Link href="/">
                 <button className="bg-[#e6ebf5] border-t-white border-l-white border-b-[#888] border-r-[#888] border-2 px-6 py-2 text-[10px] font-bold text-[#555] active:border-t-[#888] active:border-l-[#888] active:border-b-white active:border-r-white hover:bg-white transition-colors cursor-pointer">
                   ◀ 돌아가기 (Go Back)
                 </button>
               </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
