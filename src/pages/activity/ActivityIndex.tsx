import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';

import { AllProductsPage, DashboardPage } from '@/pages/store-admin';

const ActivityIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            { heading: 'Activity Navigation' },
            { title: 'Dashboard', path: '/dashboard' },
            { title: 'Proposals', path: '/proposals' },
        ],
        []
    );
    
    useEffect(() => {
        if (context?.setSidebarMenu) {
            context.setSidebarMenu(sideBarMenuData);
        }
    }, [context]);

    return (
        <Routes>
            <Route>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/proposals' element={<AllProductsPage />} />
            </Route>
            <Route index element={<Navigate to='/dashboard' />} />
        </Routes>
    )
}

export { ActivityIndex } 
