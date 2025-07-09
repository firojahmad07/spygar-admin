import {useMemo} from 'react';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { Badge } from '@/components/ui/badge';
import { Trash2, SquarePen } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import {
    DataGridTableRowSelect,
    DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';

interface IData {
    id: string;
    code: string;
    isActive: boolean;
}
const columns = useMemo<ColumnDef<IData>[]>(
    () => [
        {
            accessorKey: 'id',
            accessorFn: (row) => row.id,
            header: () => <DataGridTableRowSelectAll />,
            cell: ({ row }) => <DataGridTableRowSelect row={row} />,
            enableSorting: false,
            enableHiding: false,
            enableResizing: false,
            size: 51,
            meta: { cellClassName: '' },
        },
        {
            id: 'info',
            accessorFn: (row) => row.code,
            header: ({ column }) => (
                <DataGridColumnHeader title="Code" column={column} />
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2.5">
                    <div className="flex flex-col gap-0.5">
                        <span className="leading-none font-medium text-sm text-mono hover:text-primary">
                            {row.original.code}
                        </span>
                    </div>
                </div>
            ),
            enableSorting: true,
            size: 300,
            meta: { cellClassName: '' },
        },
        {
            id: 'status',
            accessorFn: (row) => row.code,
            header: ({ column }) => (
                <DataGridColumnHeader title="Status" column={column} />
            ),
            cell: ({ row }) => {
                const variant = row.original.isActive ? 'success' : 'destructive';
                const statusLabel = row.original.isActive ? 'Active' : 'Inactive';
                return (
                    <Badge size="sm" variant={variant} appearance="outline">
                        {statusLabel}
                    </Badge>
                );
            },
            enableSorting: true,
            size: 300,
            meta: { cellClassName: '' },
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => (
                <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-3 text-sm text-mono font-medium">
                        <span className="flex items-center gap-1">
                            <Trash2 size={16} className="text-sm text-muted-foreground" />
                        </span>
                        <span className="border-r border-r-input h-4"></span>
                        <span className="flex items-center gap-1">
                            <SquarePen size={16} className="text-sm text-muted-foreground" />
                        </span>
                    </span>
                </div>
            ),
            enableSorting: false,
            size: 60,
            meta: {
                headerClassName: '',
            },
        },
    ],
    [],
);


export {columns}