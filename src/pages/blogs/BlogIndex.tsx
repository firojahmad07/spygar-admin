import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';

import { AllProductsPage } from '@/pages/store-admin';

const BlogIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            { heading: 'Blog Navigation' },
            { title: 'User Guide', path: '/blogs/user-guide' },            
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
                <Route path='/user-guide' element={<AllProductsPage />} />
            </Route>
            <Route index element={<Navigate to='/blogs/user-guide' />} />
        </Routes>
    )
}

export { BlogIndex } 
