import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/ui/data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn: string;
  filterPlaceholder: string;
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
  filterPlaceholder,
}: DataTableToolbarProps<TData>) {
  const column = table.getColumn(filterColumn);
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={filterPlaceholder}
          value={(column?.getFilterValue() as string) ?? ""}
          onChange={(event) => column?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}