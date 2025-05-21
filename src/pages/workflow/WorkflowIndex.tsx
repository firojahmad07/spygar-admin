import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';

import { AllProductsPage, DashboardPage } from '@/pages/store-admin';

const WorkflowIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            { heading: 'Workflow Navigation' },
            { title: 'Dashboard', path: '/workflow/dashboard' },
            { title: 'Settings', path: '/workflow/settings' },
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
                <Route path='/listing' element={<AllProductsPage />} />
                <Route path='/proposals' element={<AllProductsPage />} />
            </Route>
            <Route index element={<Navigate to='/listing' />} />
        </Routes>
    )
}

export { WorkflowIndex } 
