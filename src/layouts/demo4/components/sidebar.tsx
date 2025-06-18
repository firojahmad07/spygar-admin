import { useContext } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';

import { SidebarPrimary } from './sidebar-primary';
import { SidebarSecondary } from './sidebar-secondary';

export function Sidebar() {

    const contextData = useContext(SidebarContext);

    const sideBarIsVisible = contextData?.sidebarMenu.length != 0 ? true : false;
    const sideBarVisible = contextData?.sidebarMenu.length != 0 ? '--sidebar-width' : '--sidebar-shrink-width';

    return (
      <div className={`fixed top-0 bottom-0 z-20 flex items-stretch shrink-0 w-[var(${sideBarVisible})] bg-muted`}>
        <SidebarPrimary />
        {sideBarIsVisible ? <SidebarSecondary /> : "" }
      </div>
    );
}
