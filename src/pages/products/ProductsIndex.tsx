import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';

import { AllProductsPage } from '@/pages/store-admin';
import {
ProductIndex
} from "@/pages/products/components/ProductIndex"

const ProductsIndex = () => {    
    const context = useContext(SidebarContext);
    const location = useLocation();
    const sideBarMenuData = useMemo(
        () => [],
        []
    );
    
    useEffect(() => {
        const isProductEditPage = location.pathname.includes('/edit/');
        if (!isProductEditPage && context?.setSidebarMenu) {
            context.setSidebarMenu(sideBarMenuData);
        }
    }, [context, location.pathname]);

    return (
        <Routes>
            <Route>
                <Route path='/listing' element={<AllProductsPage />} />
                <Route path='/:id/edit/*' element={<ProductIndex />} />
                <Route path='/proposals' element={<AllProductsPage />} />
            </Route>
            <Route index element={<Navigate to='/listing' />} />
        </Routes>
    )
}

export { ProductsIndex } 
