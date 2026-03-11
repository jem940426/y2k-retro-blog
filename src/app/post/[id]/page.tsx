import { PostDetail } from '@/presentation/components/PostDetail';
import { getPost } from '@/application/useCases/getPost';

interface PageProps {
  params: Promise<{ id: string }>;
}

const PostPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return (
      <div className="flex items-center justify-center w-full h-full font-bold text-xl text-[var(--color-y2k-pink-dark)]">
        게시글을 찾을 수 없습니다. (｡•́︿•̀｡)
      </div>
    );
  }

  return <PostDetail post={post} />;
};

export default PostPage;
