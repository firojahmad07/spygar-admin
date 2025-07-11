import { useEffect, useRef, useState } from 'react';
import { AppsDropdownMenu } from '@/partials/topbar/apps-dropdown-menu';
import { ChatSheet } from '@/partials/topbar/chat-sheet';
import { UserDropdownMenu } from '@/partials/topbar/user-dropdown-menu';
import { MENU_SIDEBAR } from '@/config/menu.config';

import {
  BarChart3,
  Bell,
  CheckSquare,
  Code,
  Cable,
  LayoutGrid,
  MessageCircleMore,
  MessageSquare,
  Settings,
  Settings2,
  Shield,
  ShoppingCart,
  SquareChartGantt,
  UserCircle,
  Images,
  BookOpenText,
  Users,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getHeight } from '@/lib/dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks/use-viewport';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  
} from '@/components/ui/tooltip';

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  tooltip: string;
  path: string;
  rootPath?: string;
}

const menuItems: MenuItem[] = [
  {
    tooltip: 'Activity',
    icon: BarChart3,
    rootPath: '/',
    path: '/dashboard'
  },

  {
    tooltip: 'Blogs',
    icon: BookOpenText,
    rootPath: '/blogs/',
    path: '/blogs'
  },
  {
    tooltip: 'Products',
    icon: SquareChartGantt,
    rootPath: '/product/',
    path: '/product/listing'
  },
  
  {
    tooltip: 'Store',
    icon: ShoppingCart,
    rootPath: '/store/',
    path: '/store'
  },
  {
    tooltip: 'Assets',
    icon: Images,
    path: '/assets',
    rootPath: '/',
  },
  {
    tooltip: 'Settings',
    icon: Settings,
    path: '/settings/categories',
    rootPath: '/settings/',
  },
  {
    tooltip: 'System',
    icon: Settings2,
    path: '/system/catalog-monitoring',
    rootPath: '/system/',
  },
  {
    tooltip: 'Workflow',
    icon: Cable,
    rootPath: '/workflow/',
    path: '/workflow/dashboard'
  }
];


export function SidebarPrimary() {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [scrollableHeight, setScrollableHeight] = useState<number>(0);
  const [viewportHeight] = useViewport();
  const scrollableOffset = 80;
  const { pathname } = useLocation();

  useEffect(() => {
    if (headerRef.current && footerRef.current) {
      const headerHeight = getHeight(headerRef.current);
      const footerHeight = getHeight(footerRef.current);
      const availableHeight =
        viewportHeight - headerHeight - footerHeight - scrollableOffset;
      setScrollableHeight(availableHeight);
    } else {
      setScrollableHeight(viewportHeight);
    }
  }, [viewportHeight]);

  const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0]);

  useEffect(() => {
    menuItems.forEach((item) => {
      if (
        item.rootPath === pathname ||
        (item.rootPath && pathname.includes(item.rootPath))
      ) {
        setSelectedMenuItem(item);
      }
    });
  }, [pathname]);

  return (
    <TooltipProvider>
      <div className="flex flex-col items-stretch shrink-0 gap-5 py-5 w-[80px] border-e border-input">
        <div
          ref={headerRef}
          className="hidden lg:flex items-center justify-center shrink-0"
        >
          <Link to="/">
            <img
              src={toAbsoluteUrl('/media/app/mini-logo-gray.svg')}
              className="dark:hidden min-h-[30px]"
              alt=""
            />
            <img
              src={toAbsoluteUrl('/media/app/mini-logo-gray-dark.svg')}
              className="hidden dark:block min-h-[30px]"
              alt=""
            />
          </Link>
        </div>

        {/* <div className="flex grow shrink-0">
          <div
            className="kt-scrollable-y-hover grow gap-2.5 shrink-0 flex ps-4 flex-col"
            style={{ height: `${scrollableHeight}px` }}
          >
            {menuItems.map((item, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    mode="icon"
                    {...(item === selectedMenuItem
                      ? { 'data-state': 'open' }
                      : {})}
                    className={cn(
                      'shrink-0 rounded-md size-9',
                      'data-[state=open]:bg-background data-[state=open]:border data-[state=open]:border-input data-[state=open]:text-primary',
                      'hover:bg-background hover:border hover:border-input hover:text-primary',
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className="size-4.5!" />
                        {item.tooltip}

                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.tooltip}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div> */}



      <div className="flex grow shrink-0">
          <div
            className="kt-scrollable-y-hover grow gap-2.5 shrink-0 flex ps-2 flex-col"
            style={{ height: `${scrollableHeight}px` }}
          >
            {menuItems.map((item, index) => (
              <Link to={item.path} key={index}
                className={              
                  cn(
                  `${item === selectedMenuItem && 'active bg-gray-400 text-red-600 '}`,
                  'flex flex-col items-center justify-center w-[62px] h-[60px] gap-1 p-2 rounded-lg',
                  'text-xs font-medium text-gray-600  bg-transparent',
                  'hover:text-primary hover:bg-background hover:border-border',
                  'data-[active=true]:text-primary data-[active=true]:bg-background data-[active=true]:border-border',
                )}
              >
                <item.icon className="size-4.5!" />
                {item.tooltip}
              </Link>
            ))}
          </div>
        </div>



        <div
          ref={footerRef}
          className="flex flex-col gap-4 items-center shrink-0"
        >
          <ChatSheet
            trigger={
              <Button
                variant="ghost"
                mode="icon"
                className="size-9 hover:bg-background hover:[&_svg]:text-primary"
              >
                <MessageCircleMore className="size-4.5!" />
              </Button>
            }
          />
          <AppsDropdownMenu
            trigger={
              <Button
                variant="ghost"
                mode="icon"
                className="size-9 hover:bg-background hover:[&_svg]:text-primary"
              >
                <LayoutGrid className="size-4.5!" />
              </Button>
            }
          />
          <UserDropdownMenu
            trigger={
              <img
                className="size-9 rounded-full border border-border shrink-0 cursor-pointer"
                src={toAbsoluteUrl('/media/avatars/300-2.png')}
                alt="User Avatar"
              />
            }
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
