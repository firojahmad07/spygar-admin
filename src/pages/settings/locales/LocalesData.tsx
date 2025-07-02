'use client';

import { useMemo, useEffect, useState } from 'react';
import { StoreAdminCreateShippingLabelSheet } from '@/pages/store-admin/components/create-shipping-label-sheet';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { Badge, BadgeDot, BadgeProps } from '@/components/ui/badge';
import apiFetcher from '@/fetcher/apiFetcher';
import { AxiosResponse } from "axios"

const defaultAvatar = "";
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
  Database,
  EllipsisVertical,
  LogIn,
  LogOut,
  Search,
  Trash2,
  SquarePen,
  X,
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
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { formatDate } from 'date-fns';

interface IProductInfo {
  product: string;
  name: string;
  sku: string;
}

interface IStock {
  value1: number;
  value2: number;
  value3: number;
}

interface IDelta {
  label: string;
  variant:
    | 'info'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'mono'
    | 'destructive'
    | null
    | undefined;
}

interface ISupplier {
  logo: string;
  name: string;
}

interface IData {
  id: string;
  code: string;
  isActive: boolean;
  label: string;
}

function ActionsCell({ row }: { row: Row<IData> }) {
  const { copyToClipboard } = useCopyToClipboard();
  const handleCopyId = () => {
    copyToClipboard(String(row.original.id));
    const message = `User ID successfully copied: ${row.original.id}`;
    toast.custom(
      (t) => (
        <Alert
          variant="mono"
          icon="success"
          close={false}
          onClose={() => toast.dismiss(t)}
        >
          <AlertIcon>
            <RiCheckboxCircleFill />
          </AlertIcon>
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      ),
      {
        position: 'top-center',
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" mode="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => {}}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export interface User {
  id: string;
  code: string;
  isActive: boolean;
  label: string;
  // add more fields as needed
}
export interface UsersResponse {
  member: User[];
  totalItems: number,
  meta: {
    pageIndex: number;
    pageSize: number;
    // any other pagination info
  };
}

export function LocalesData() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'id', desc: true },
  ]);
  useEffect( () => {
    apiFetcher.get<UsersResponse, any>('/locales')
      .then((responseData: AxiosResponse<UsersResponse, any>) => {
        setData(responseData.member);
        setPagination(responseData.meta);
        setTotalItems(responseData.totalItems)
      });
  }, []);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses] = useState<string[]>([]);
  // const [userData, setUsersData] = useState([])
  // const loadUsers = async () => {



  // const filteredData = useMemo(() => {
  //   return data.filter((item) => {
  //     // Filter by status
  //     const matchesStatus =
  //       !selectedStatuses?.length || selectedStatuses.includes(item.info.fullName);

  //     // Filter by search query (case-insensitive)
  //     const searchLower = searchQuery.toLowerCase();
  //     const matchesSearch =
  //       !searchQuery ||
  //       item.category.toLowerCase().includes(searchLower) ||
  //       item.supplier.name.toLowerCase().includes(searchLower) ||
  //       item.price.toLowerCase().includes(searchLower);

  //     return matchesStatus && matchesSearch;
  //   });
  // }, [searchQuery, selectedStatuses]);

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
        id: 'label',
        accessorFn: (row) => row.label,
        header: ({ column }) => (
          <DataGridColumnHeader title="label" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col gap-0.5">
              <span className="leading-none font-medium text-sm text-mono hover:text-primary">
                {row.original.label}
              </span>
            </div>
          </div>
        ),
        enableSorting: true,
        size: 300,
        meta: { cellClassName: '' },
      },
      {
        id: 'info',
        accessorFn: (row) => row.code,
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => {
          const variant = row.original.isActive ? 'success' : 'destructive';
          const statusLabel = row.original.isActive ? 'Active' : 'Inactive';
          return (
            <Badge
              size="sm"
              variant={variant}
              appearance="outline"
            >
              {statusLabel}
            </Badge>
          )
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

  // const table = useReactTable({
  //   // columns,
  //   // data: usersData,
  //   // pageCount: 15
  //   // getRowId: (row: IData) => row.id,
  //   // state: {
  //     // pagination,
  //     // sorting,
  //   // }
  //   // onPaginationChange: setPagination,
  //   // onSortingChange: setSorting,
  //   // getCoreRowModel: getCoreRowModel(),
  //   // getFilteredRowModel: getFilteredRowModel(),
  //   // getPaginationRowModel: getPaginationRowModel(),
  //   // getSortedRowModel: getSortedRowModel(),
  // });

  const table = useReactTable({
    columns,
    data: data,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getRowId: (row: IData) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleTrackShippingSheetClose = () => {
    setTrackShippingSheetOpen(false);
  };

  const handleTrackShippingSheetOpen = () => {
    setTrackShippingSheetOpen(true);
  };

  const handleCreateShippingLabelSheetClose = () => {
    setCreateShippingLabelSheetOpen(false);
  };

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
                placeholder="Search by ID"
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
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="runners">Runners</SelectItem>
                  <SelectItem value="sneakers">Sneakers</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="runners">Runners</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="swift-stock">SwiftStock</SelectItem>
                  <SelectItem value="core-mart">CoreMart</SelectItem>
                  <SelectItem value="prime-stock">PrimeStock</SelectItem>
                  <SelectItem value="stock-lab">StockLab</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <>
            <Button variant="primary" 
              onClick={handleCreateShippingLabelSheetOpen}>
              Create
            </Button>
            {/* <StoreAdminCreateShippingLabelSheet
              open={isCreateShippingLabelSheetOpen}
              onOpenChange={handleCreateShippingLabelSheetClose}
            /> */}
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
