"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { type Post } from '@/types';
 
export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author"
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories = row.original.categories;
      return categories?.map((cat: any) => cat.name).join(', ') || '';
    }
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="flex gap-2">
          <a href={`/posts/${post.id}/edit`} className="text-blue-600 hover:underline">Edit</a>
          <button className="text-red-600 hover:underline" onClick={() => console.log("Delete", post.id)}>Delete</button>
        </div>
      );
    }
  }
]