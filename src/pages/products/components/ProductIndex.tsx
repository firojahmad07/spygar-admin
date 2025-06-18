import { Route, Routes, Navigate, useParams} from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';
import { ProductLayout } from './product-layout';

import {
    LatestPayment,
} from './blocks';

const ProductIndex = () => {    
    const {id} = useParams();
    const context = useContext(SidebarContext);

    const sideBarMenuData = useMemo(
        () => {
            if (!id) return [];
            return [
                { heading: 'Product Navigation' },
                { title: 'Attributes', path: `/product/${id}/edit/attributes` },
                { title: 'Assets', path: `/product/${id}/edit/assets` },
                { title: 'PX Insights', path: `/product/${id}/edit/px-insights` },
                { title: 'Categories', path: `/product/${id}/edit/categories` },
                { title: 'Associations', path: `/product/${id}/edit/categories` },
                { title: 'Proposals', path: `/product/${id}/edit/proposals` },
                { title: 'History', path: `/product/${id}/edit/history` },
            ]            
        },
        [id]
    );
    
    useEffect(() => {
        if (context?.setSidebarMenu) {
            context.setSidebarMenu(sideBarMenuData);
        }
    }, [context, sideBarMenuData]);

    return (
        <Routes>
            <Route element={<ProductLayout />}>
                <Route path='/attributes' element={<LatestPayment />} />
                <Route path='/assets' element={<LatestPayment />} />
            </Route>
            <Route index element={<Navigate to={`/attributes`} />} />
        </Routes>
    )
}

export { ProductIndex } 
