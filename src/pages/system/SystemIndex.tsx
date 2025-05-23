import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';


import { AllProductsPage, DashboardPage } from '@/pages/store-admin';

const SystemIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            { heading: 'System Navigation' },
            { title: 'Catalog Monitoring', path: '/system/catalog-monitoring' },
            { title: 'Configuration', path: '/system/configuration' },

            { heading: 'User Management' },
            { title: 'User', path: '/system/users' },
            { title: 'Roles', path: '/system/roles' },

            { heading: 'Catalog' },
            { title: 'Categories', path: '/system/categories' },
            { title: 'Rules', path: '/system/rules' },
            { title: 'Identifier Generator', path: '/system/identifier-generator' },
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
                <Route path='/categories' element={ <AllProductsPage /> } />
                <Route path='/rules' element={ <AllProductsPage /> } />
                <Route path='/identifier-generator' element={ <AllProductsPage /> } />

                <Route path='/catalog-monitoring' element={ <AllProductsPage /> } />
                <Route path='/configuration' element={ <AllProductsPage /> } />
                {/* user navigation */}
                <Route path='/users' element={ <AllProductsPage /> } />
                <Route path='/roles' element={ <AllProductsPage /> } />
                <Route path='/user-groups' element={ <AllProductsPage /> } />



            </Route>
            <Route index element={<Navigate to='/system/catalog-monitoring' />} />
        </Routes>
    )
}

export { SystemIndex } 
