import { useForm } from '@inertiajs/react';
import type { BreadcrumbItem, PageProps, PostsPageProps } from '@/types';
import type { Post } from '@/types';

interface Props extends PageProps {
  post: Post;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/post',
    },
];

export default function Edit({ post }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    title: post.title,
    slug: post.slug,
    post_content: post.post_content,
    category_ids: post.categories.map((c) => c.id),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('posts.update', post.id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Edit Post</h1>

      <div>
        <label>Title</label>
        <input value={data.title} onChange={e => setData('title', e.target.value)} />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label>Slug</label>
        <input value={data.slug} onChange={e => setData('slug', e.target.value)} />
        {errors.slug && <p className="text-red-500">{errors.slug}</p>}
      </div>

      <div>
        <label>Content</label>
        <textarea value={data.post_content} onChange={e => setData('post_content', e.target.value)} />
        {errors.post_content && <p className="text-red-500">{errors.post_content}</p>}
      </div>

      {/* Optional: category checkboxes here if needed */}

      <button type="submit" disabled={processing}>
        Save
      </button>
    </form>
  );
}
