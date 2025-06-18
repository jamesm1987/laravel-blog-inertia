import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps, PostsPageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from "react";
import { columns } from "./columns"
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'New Post',
        href: '/posts/create',
    },
];

export default function Create() {

    const { posts, message, filters } = usePage<PostsPageProps>().props;

    const { delete: destroy } = useForm();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = (postId: number) => {
        destroy(route("posts.destroy", postId), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success("Post deleted successfully");
        },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <DataTable columns={columns} data={posts.data} meta={posts.meta}/>
                 </div>
            </div>
        </AppLayout>
    );
}
