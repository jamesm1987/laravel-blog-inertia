"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { type Tag } from '@/types';
 
export const columns: ColumnDef<Tag>[] = [
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