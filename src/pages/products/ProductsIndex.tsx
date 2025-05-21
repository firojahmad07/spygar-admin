import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';

import { AllProductsPage, DashboardPage } from '@/pages/store-admin';

const ProductsIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [],
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

export { ProductsIndex } 
