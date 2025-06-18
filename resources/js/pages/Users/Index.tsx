import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PageProps, UsersPageProps } from '@/types';
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
        title: 'Users',
        href: '/users',
    },
];

export default function Index() {

    const { users, message, roles, filters } = usePage<UsersPageProps>().props;

    const { delete: destroy } = useForm();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = (userId: number) => {
        destroy(route("users.destroy", userId), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success("User deleted successfully");
        },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <DataTable 
                        columns={columns} 
                        data={users.data} 
                        meta={users.meta}
                        filterColumn="name"
                        filterPlaceholder="Search users..."
                    />
                 </div>
            </div>
        </AppLayout>
    );
}
