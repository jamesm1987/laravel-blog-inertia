"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { type Category } from '@/types';
 
export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "count",
    header: "Count",
  }
]