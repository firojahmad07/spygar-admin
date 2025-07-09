'use client';

import { useMemo, useEffect, useState } from 'react';
import apiFetcher from '@/fetcher/apiFetcher';
import { AxiosResponse } from "axios"
import { Link } from 'react-router';

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Search,
  Trash2,
  SquarePen,
  X,
  Plus
} from 'lucide-react';

import { toast } from 'sonner';
import { formatDateTime, toAbsoluteUrl } from '@/lib/helpers';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTable } from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
  DataGridTable,
} from '@/components/ui/data-grid-table';


import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


interface IData {
  id: string;
  code: string;
}
export interface User {
  id: string;
  code: string;
  // add more fields as needed
}
export interface UsersResponse {
  member: User[];
  totalItems: number,
}

export function ChannelsData() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'id', desc: true },
  ]);
  const { pageIndex, pageSize } = pagination;

  useEffect( () => {
    const page = pageIndex + 1;
    const size = pageSize;
    let url = `/channels?page=${page}&size=${size}`;

    apiFetcher.get<UsersResponse, any>(url)
      .then((responseData: AxiosResponse<UsersResponse, any>) => {
        setData(responseData.member);
        setTotalItems(responseData.totalItems)
      });
  }, [pageIndex, pageSize]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
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
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-3 text-sm text-mono font-medium">
              <span className="flex items-center gap-1">
                <Trash2 size={16} className="text-sm text-muted-foreground" />
              </span>
              <span className="border-r border-r-input h-4"></span>
              <Link to={`/settings/channel/${row.original.id}/edit`} className="flex items-center gap-1">
                <SquarePen size={16} className="text-sm text-muted-foreground" />
              </Link>
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

  const table = useReactTable({
    columns,
    data: data,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    state: {
      pagination
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getRowId: (row: IData) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleCreateShippingLabelSheetOpen = () => {
    setCreateShippingLabelSheetOpen(true);
  };

  return (
    <DataGrid
      table={table}
      recordCount={data?.length || 0}
      tableLayout={{
        columnsPinnable: false,
        columnsMovable: true,
        columnsVisibility: false,
        cellBorder: true,
      }}
    >
      <Card className="min-w-full">
        <CardHeader className="py-5 flex-wrap gap-2">
          <div className="flex gap-5">
            <div className="relative w-full max-w-[200px]">
              <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search by code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9 w-40"
              />
              {searchQuery.length > 0 && (
                <Button
                  mode="icon"
                  variant="ghost"
                  className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                  onClick={() => setSearchQuery('')}
                >
                  <X />
                </Button>
              )}
            </div>
          </div>
          <>
            <Button variant="primary" 
              onClick={handleCreateShippingLabelSheetOpen}>
              <Plus /> Create
            </Button>
          </>
        </CardHeader>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>       
      </Card>
    </DataGrid>
  );
}