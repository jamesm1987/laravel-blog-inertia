import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import type { BreadcrumbItem, PageProps, PostPageProps } from '@/types';
import type { Post } from '@/types';
import CreatableSelect from 'react-select/creatable';
import TiptapEditor from '@/components/TiptapEditor';

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
    tag_ids: post.tags.map((c) => c.id),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('posts.update', post.id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Posts" />
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col md:flex-row">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Edit Blog</h2>
                    <Link href="/admin/blogs" className="text-blue-500 hover:underline mb-4 flex items-center">
                        Back to Blogs
                    </Link>
                
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={(val) => setData('title', val)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                            />
                            {errors.title && <div className="text-red-500 mt-1">{errors.title}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block mt-4 text-gray-700 dark:text-gray-300 mb-2">Content</label>

                            <TiptapEditor
                              modelValue={post.post_content}
                              onChange={(val) => setData('post_content', val)}
                            />
                            {errors.post_content && <div className="text-red-500 mt-1">{errors.post_content}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {processing ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/4 md:ml-6 mt-6 md:mt-10">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Image Upload</label>
                        <input
                            type="file"
                            name="imageFile"
                            accept="image/*"
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                        />
                        

                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-4">Image Preview</h3>
                        

                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300">Current Image:</h4>
                                <p className="text-gray-600 dark:text-gray-400">No current image</p>

                        </div>

                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300">Tags:</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                                <CreatableSelect
                                    isMulti
                                    name="tags"
                                    value={data.tag_ids.map(id => {
                                        const tag = post.tags.find(t => t.id === id);
                                        return { value: id, label: tag?.name || `Tag ${id}` };
                                    })}
                                    onChange={(selected) => {
                                        const ids = selected.map(option => option.value);
                                        setData('tag_ids', ids);
                                    }}
                                    options={post.tags.map(tag => ({
                                        value: tag.id,
                                        label: tag.name,
                                    }))}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    />
                                    {errors.tag_ids && <div className="text-red-500 mt-1">{errors.tag_ids}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </AppLayout>
  );
}
