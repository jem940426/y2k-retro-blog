import Link from 'next/link';
import { getPosts } from '@/application/useCases/getPost';

const HomePage = async () => {
  const posts = await getPosts();
  return (
    <div className="flex items-center justify-center w-full h-full relative z-10 px-8">
      
      {/* 장식 요소들 */}
      <div className="absolute top-[15%] left-[20%] text-[var(--color-y2k-pink-main)] text-3xl rotate-12 drop-shadow-sm">✦</div>
      <div className="absolute top-[10%] right-[30%] text-[var(--color-y2k-pink-main)] text-4xl drop-shadow-sm">✿</div>
      <div className="absolute bottom-[10%] right-[20%] text-[var(--color-y2k-pink-dark)] text-2xl rotate-[-15deg] drop-shadow-sm">💖</div>

      {/* 왼쪽: 사이드바 윈도우 (카테고리/프로필) - 약간 기울어져 겹치는 효과 */}
      <div className="w-[260px] bg-[var(--color-y2k-pink-bg)] p-1 rounded-sm shadow-[4px_4px_0px_0px_rgba(255,102,163,0.3)] z-20 transform -rotate-2 origin-bottom-right translate-x-4">
        <div className="w-full bg-[#fdfafb] border-2 border-[var(--color-y2k-border)] flex flex-col">
          
          {/* 타이틀 바 */}
          <div className="bg-[var(--color-y2k-pink-main)] px-2 py-1.5 flex justify-between items-center select-none">
            <span className="font-bold text-[10px] text-white tracking-widest leading-none drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">Profile.exe</span>
            <div className="flex gap-1 items-center">
              <Link href="/login" className="px-1 text-[8px] font-bold text-white hover:text-[#ffe6f0] underline decoration-dashed mr-1">
                Admin
              </Link>
              <button className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white">-</button>
              <button className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white">X</button>
            </div>
          </div>

          {/* 사이드바 컨텐츠 */}
          <div className="p-4 flex flex-col min-h-[480px]">
            {/* 프로필 이미지(더미) & 상태 */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-[#ffd1dc] border-2 border-[var(--color-y2k-pink-main)] flex items-center justify-center text-4xl mb-3 shadow-[2px_2px_0px_0px_rgba(255,153,204,1)]">
                🎀
              </div>
              <h2 className="font-bold text-[12px] text-[var(--color-y2k-pink-dark)] mb-1">방돌이의 비밀기지</h2>
              <div className="text-[9px] text-[#666] bg-white border border-[#ccc] px-2 py-1 w-full text-center">
                오늘의 TMI: 피곤하다 (｡•́︿•̀｡)
              </div>
            </div>

            {/* 카테고리 폴더 목록 */}
            <div className="flex-1">
              <h3 className="text-[10px] font-bold text-[var(--color-y2k-pink-main)] mb-2 border-b-2 border-dashed border-[var(--color-y2k-pink-bg)] pb-1">Categories</h3>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-[11px] hover:text-[var(--color-y2k-pink-dark)] cursor-pointer bg-white border border-[#ffe6f0] p-1.5 hover:bg-[#fff0f5]">
                  <span className="text-[14px]">📁</span> 일상 다이어리 기록
                </li>
                <li className="flex items-center gap-2 text-[11px] hover:text-[var(--color-y2k-pink-dark)] cursor-pointer bg-white border border-[#ffe6f0] p-1.5 hover:bg-[#fff0f5]">
                  <span className="text-[14px]">📁</span> 개발 공부 스니펫
                </li>
                <li className="flex items-center gap-2 text-[11px] hover:text-[var(--color-y2k-pink-dark)] cursor-pointer bg-white border border-[#ffe6f0] p-1.5 hover:bg-[#fff0f5]">
                  <span className="text-[14px]">📁</span> 몽글몽글 생각 보관함
                </li>
              </ul>
            </div>

            {/* 통계 위젯 */}
            <div className="mt-auto bg-[#fff0f5] border-2 border-[var(--color-y2k-border)] p-2 text-center shadow-[inset_1px_1px_0px_white,inset_-1px_-1px_0px_#e6ccda]">
              <div className="text-[9px] text-[#888] font-bold">Total Posts</div>
              <div className="text-[14px] font-black text-[var(--color-y2k-pink-dark)] drop-shadow-[1px_1px_0px_white]">42</div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽: 메인 피드 윈도우 (게시글 목록) */}
      <div className="w-[580px] bg-[var(--color-y2k-pink-bg)] p-1 rounded-sm shadow-[6px_6px_0px_0px_rgba(255,102,163,0.4)] z-10">
        <div className="w-full bg-[#fdfafb] border-2 border-[var(--color-y2k-border)] flex flex-col">
          
          {/* 타이틀 바 */}
          <div className="bg-[var(--color-y2k-pink-main)] px-2 py-1.5 flex justify-between items-center select-none">
            <span className="font-bold text-[10px] text-white tracking-widest leading-none drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">Posts_List.exe</span>
            <div className="flex gap-1">
              <button className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white">-</button>
              <button className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white">□</button>
              <button className="w-[14px] h-[14px] bg-[#ffe6f0] border border-[var(--color-y2k-border)] flex items-center justify-center font-black text-[8px] text-[var(--color-y2k-pink-dark)] leading-none hover:bg-white">X</button>
            </div>
          </div>

          {/* 메인 리스트 컨텐츠 */}
          <div className="p-5 flex flex-col min-h-[520px]">
            <h1 className="text-lg font-bold text-[var(--color-y2k-pink-dark)] mb-4 tracking-[0.1em] drop-shadow-[1px_1px_0px_rgba(255,204,229,1)]">
              ♥ LATEST POSTS ♥
            </h1>

            {/* 게시글 카드 리스트 */}
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
              {posts.length === 0 ? (
                <div className="text-center text-[12px] text-[#888] py-10">
                  작성된 게시글이 없습니다. 첫 글을 작성해보세요!
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="bg-white border-2 border-[#e6ccda] p-3 flex gap-4 hover:border-[var(--color-y2k-pink-main)] hover:shadow-[2px_2px_0px_0px_rgba(255,153,204,0.5)] transition-all cursor-pointer group">
                    <div className="w-[80px] h-[80px] shrink-0 bg-[#fff0f5] border border-[var(--color-y2k-pink-bg)] flex items-center justify-center text-3xl">
                      {post.emoji}
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <h2 className="text-[13px] font-bold text-[#444] group-hover:text-[var(--color-y2k-pink-dark)] truncate">{post.title}</h2>
                        <span className="text-[8px] text-[#999] tracking-wider shrink-0">{post.date}</span>
                      </div>
                      <p className="text-[10px] text-[#666] leading-relaxed line-clamp-2 pr-2 break-all">
                        {post.content.replace(/<[^>]+>/g, '')}
                      </p>
                      <Link href={`/post/${post.id}`} className="mt-auto self-end text-[9px] font-bold bg-[#ff99cc] text-white px-2 py-1 rounded-sm opacity-80 group-hover:opacity-100 flex items-center gap-1 shrink-0">
                        읽기 <span className="text-[8px]">▶</span>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 픽셀 스타일 페이지네이션 */}
            <div className="mt-6 flex justify-center gap-1">
              <button className="bg-[#e6ebf5] border-t-white border-l-white border-b-[#888] border-r-[#888] border-2 px-2 py-1 text-[9px] font-bold text-[#555] active:border-t-[#888] active:border-l-[#888] active:border-b-white active:border-r-white">
                ◀ Prev
              </button>
              <button className="bg-[#ff99cc] border-t-[#ffd1dc] border-l-[#ffd1dc] border-b-[var(--color-y2k-pink-dark)] border-r-[var(--color-y2k-pink-dark)] border-2 px-2 py-1 text-[9px] font-bold text-white shadow-inner">
                1
              </button>
              <button className="bg-[#e6ebf5] border-t-white border-l-white border-b-[#888] border-r-[#888] border-2 px-2 py-1 text-[9px] font-bold text-[#555] active:border-t-[#888] active:border-l-[#888] active:border-b-white active:border-r-white hover:bg-white">
                2
              </button>
              <button className="bg-[#e6ebf5] border-t-white border-l-white border-b-[#888] border-r-[#888] border-2 px-2 py-1 text-[9px] font-bold text-[#555] active:border-t-[#888] active:border-l-[#888] active:border-b-white active:border-r-white hover:bg-white">
                3
              </button>
              <button className="bg-[#e6ebf5] border-t-white border-l-white border-b-[#888] border-r-[#888] border-2 px-2 py-1 text-[9px] font-bold text-[#555] active:border-t-[#888] active:border-l-[#888] active:border-b-white active:border-r-white hover:bg-white">
                Next ▶
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
