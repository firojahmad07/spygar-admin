import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';

import { AllProductsPage, DashboardPage } from '@/pages/store-admin';

const StoreIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            { heading: 'Store Navigation' },
            { title: 'Orders', path: '/store/orders' },
            { title: 'Payments', path: '/store/payments' },
            { title: 'Invoices', path: '/store/invoices' },
            { title: 'Customers', path: '/store/customers' },
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
                <Route path='/orders' element={ <AllProductsPage /> } />
                <Route path='/payments' element={ <AllProductsPage /> } />
                <Route path='/invoices' element={ <AllProductsPage /> } />
                <Route path='/customers' element={ <AllProductsPage /> } />
            </Route>
            <Route index element={<Navigate to='/store/orders' />} />
        </Routes>
    )
}

export { StoreIndex } 
