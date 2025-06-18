'use client';

import { useMemo, useEffect, useState } from 'react';
import { StoreAdminCreateShippingLabelSheet } from '@/pages/store-admin/components/create-shipping-label-sheet';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { Badge, BadgeDot, BadgeProps } from '@/components/ui/badge';

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
  firstName: string;
  email: string;
  lastName: string;
  fullName: string;
  userType: string;
  status: boolean;
  created: string;
  lastLogin: string;
}

const data: IData[] = [
  {
    id: '1',
    info: {
      product: '1.png',
      name: 'Air Max 270 React Eng…',
      sku: 'WM-8421',
    },
    stock: {
      value1: 90,
      value2: 12,
      value3: 27,
    },
    delta: {
      label: '+29',
      variant: 'success',
    },
    price: '83.00',
    category: 'Sneakers',
    supplier: {
      logo: 'clusterhq.svg',
      name: 'SwiftStock',
    },
    updated: '18 Aug, 2025',
  },
  {
    id: '2',
    info: {
      product: '2.png',
      name: 'Trail Runner Z2',
      sku: 'UC-3990',
    },
    stock: {
      value1: 12,
      value2: 5,
      value3: 2,
    },
    delta: {
      label: '-235',
      variant: 'destructive',
    },
    price: '110.00',
    category: 'Outdoor',
    supplier: {
      logo: 'coinhodler.svg',
      name: 'NexaSource',
    },
    updated: '17 Aug, 2025',
  },
  {
    id: '3',
    info: {
      product: '3.png',
      name: 'Urban Flex Knit Low…',
      sku: 'KB-8820',
    },
    stock: {
      value1: 47,
      value2: 15,
      value3: 0,
    },
    delta: {
      label: '+8',
      variant: 'success',
    },
    price: '76.50',
    category: 'Runners',
    supplier: {
      logo: 'infography.svg',
      name: 'CoreMart',
    },
    updated: '15 Aug, 2025',
  },
  {
    id: '4',
    info: {
      product: '10.png',
      name: 'Urban Flex Knit Low…',
      sku: 'KB-8820',
    },
    stock: {
      value1: 47,
      value2: 15,
      value3: 0,
    },
    delta: {
      label: '+8',
      variant: 'success',
    },
    price: '76.50',
    category: 'Runners',
    supplier: {
      logo: 'infography.svg',
      name: 'CoreMart',
    },
    updated: '15 Aug, 2025',
  },
  {
    id: '5',
    info: {
      product: '1.png',
      name: 'Blaze Street Classic',
      sku: 'LS-1033',
    },
    stock: {
      value1: 0,
      value2: 12,
      value3: 5,
    },
    delta: {
      label: '-11',
      variant: 'destructive',
    },
    price: '69.99',
    category: 'Sneakers',
    supplier: {
      logo: 'clusterhq.svg',
      name: 'StockLab',
    },
    updated: '14 Aug, 2025',
  },
  {
    id: '6',
    info: {
      product: '2.png',
      name: 'Terra Trekking Max Pro',
      sku: 'WC-5510',
    },
    stock: {
      value1: 120,
      value2: 20,
      value3: 10,
    },
    delta: {
      label: '+45',
      variant: 'success',
    },
    price: '129.00',
    category: 'Outdoor',
    supplier: {
      logo: 'coinhodler.svg',
      name: 'PrimeStock',
    },
    updated: '13 Aug, 2025',
  },
  {
    id: '7',
    info: {
      product: '9.png',
      name: 'Lite Runner Evo',
      sku: 'GH-7312',
    },
    stock: {
      value1: 33,
      value2: 8,
      value3: 1,
    },
    delta: {
      label: '+3',
      variant: 'warning',
    },
    price: '59.00',
    category: 'Sneakers',
    supplier: {
      logo: 'infography.svg',
      name: 'NexaSource',
    },
    updated: '12 Aug, 2025',
  },
  {
    id: '8',
    info: {
      product: '4.png',
      name: 'Classic Street Wear 2.0',
      sku: 'UH-2300',
    },
    stock: {
      value1: 5,
      value2: 2,
      value3: 3,
    },
    delta: {
      label: '-5',
      variant: 'warning',
    },
    price: '72.00',
    category: 'Runners',
    supplier: {
      logo: 'clusterhq.svg',
      name: 'NexaSource',
    },
    updated: '11 Aug, 2025',
  },
  {
    id: '9',
    info: {
      product: '5.png',
      name: 'Enduro AllTerrain High',
      sku: 'MS-8702',
    },
    stock: {
      value1: 64,
      value2: 10,
      value3: 0,
    },
    delta: {
      label: '+12',
      variant: 'success',
    },
    price: '119.50',
    category: 'Sneakers',
    supplier: {
      logo: 'telcoin.svg',
      name: 'VeloSource',
    },
    updated: '10 Aug, 2025',
  },
  {
    id: '10',
    info: {
      product: '6.png',
      name: 'FlexRun Urban Core',
      sku: 'BS-6112',
    },
    stock: {
      value1: 89,
      value2: 25,
      value3: 6,
    },
    delta: {
      label: '+19',
      variant: 'success',
    },
    price: '98.75',
    category: 'Outdoor',
    supplier: {
      logo: 'coinhodler.svg',
      name: 'StockLab',
    },
    updated: '9 Aug, 2025',
  },
  {
    id: '11',
    info: {
      product: '7.png',
      name: 'Aero Walk Lite',
      sku: 'HC-9031',
    },
    stock: {
      value1: 0,
      value2: 0,
      value3: 0,
    },
    delta: {
      label: '-60',
      variant: 'destructive',
    },
    price: '45.00',
    category: 'Runners',
    supplier: {
      logo: 'coinhodler.svg',
      name: 'SwiftStock',
    },
    updated: '8 Aug, 2025',
  },
  {
    id: '12',
    info: {
      product: '8.png',
      name: 'TrailMaster XTR Boost',
      sku: 'TM-8821',
    },
    stock: {
      value1: 45,
      value2: 15,
      value3: 7,
    },
    delta: {
      label: '+8',
      variant: 'success',
    },
    price: '110.00',
    category: 'Outdoor',
    supplier: {
      logo: 'equacoin.svg',
      name: 'PrimeStock',
    },
    updated: '7 Aug, 2025',
  },
  {
    id: '13',
    info: {
      product: '6.png',
      name: 'Velocity Nitro 3',
      sku: 'VN-3322',
    },
    stock: {
      value1: 78,
      value2: 18,
      value3: 2,
    },
    delta: {
      label: '+6',
      variant: 'success',
    },
    price: '89.99',
    category: 'Runners',
    supplier: {
      logo: 'clusterhq.svg',
      name: 'VeloSource',
    },
    updated: '6 Aug, 2025',
  },
  {
    id: '14',
    info: {
      product: '3.png',
      name: 'Urban Drift Street',
      sku: 'UD-4420',
    },
    stock: {
      value1: 0,
      value2: 0,
      value3: 0,
    },
    delta: {
      label: '-60',
      variant: 'destructive',
    },
    price: '66.60',
    category: 'Sneakers',
    supplier: {
      logo: 'quickbooks.svg',
      name: 'SwiftStock',
    },
    updated: '5 Aug, 2025',
  },
];



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


export function UsersData({usersData}) {

  // const [sorting, setSorting] = useState<SortingState>([
  //   { id: 'id', desc: true },
  // ]);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [selectedStatuses] = useState<string[]>([]);
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
        accessorFn: (row) => row.fullName,
        header: ({ column }) => (
          <DataGridColumnHeader title="User" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center border border-border bg-accent/50 rounded-md h-10 w-[50px]">
              <img
                src={toAbsoluteUrl(
                  `/media/avatars/300-2.png`,
                )}
                className="rounded-full size-10 shrink-0"
                alt={`demo image`}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <a
                href="#"
                className="leading-none font-medium text-sm text-mono hover:text-primary"
              >
                {row.original.fullName}
              </a>
              <div className="text-xs text-secondary-foreground">

                {/* <div class="text-muted-foreground text-xs">janfkahsai@gmail.com</div> */}
                <span className="text-muted-foreground text-xs">
                  {row.original.email}                  
                </span>
              </div>
            </div>
          </div>
        ),
        enableSorting: true,
        size: 300,
        meta: { cellClassName: '' },
      },
      {
        id: 'Created',
        accessorFn: (row) => row.created,
        header: ({ column }) => (
          <DataGridColumnHeader title="Joined" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-secondary-foreground font-normal">
            {row.original.created}
          </span>
        ),
        enableSorting: true,
        size: 130,
        meta: { cellClassName: '' },
      },
      {
        id: 'Created',
        accessorFn: (row) => row.lastLogin,
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Sign In" column={column} />
        ),
        cell: ({ row }) => {
          const lastSignIn = new Date(row.original?.lastLogin);
          return (
            <span className="text-secondary-foreground font-normal">
            {row.original.lastLogin}
            </span>
          )
        },
        enableSorting: true,
        size: 130,
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
    data: usersData,
    pageCount: 15,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // const handleTrackShippingSheetClose = () => {
  //   setTrackShippingSheetOpen(false);
  // };

  // const handleTrackShippingSheetOpen = () => {
  //   setTrackShippingSheetOpen(true);
  // };

  // const handleCreateShippingLabelSheetClose = () => {
  //   setCreateShippingLabelSheetOpen(false);
  // };

  // const handleCreateShippingLabelSheetOpen = () => {
  //   setCreateShippingLabelSheetOpen(true);
  // };

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
        {/* <CardHeader className="py-5 flex-wrap gap-2">
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
            <StoreAdminCreateShippingLabelSheet
              open={isCreateShippingLabelSheetOpen}
              onOpenChange={handleCreateShippingLabelSheetClose}
            />
          </>
        </CardHeader> */}
        {/* <CardFooter>
          <DataGridPagination />
        </CardFooter> */}
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
