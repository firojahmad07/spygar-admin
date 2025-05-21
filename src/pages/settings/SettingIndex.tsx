import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';

import { AllProductsPage, DashboardPage } from '@/pages/store-admin';

const SettingIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            { heading: 'Catalog' },
            { title: 'Categories', path: '/settings/categories' },
            { title: 'Locales', path: '/settings/locales' },
            { title: 'Currencies', path: '/settings/currencies' },

            { heading: 'Product' },
            { title: 'Attributes', path: '/settings/attributes' },
            { title: 'Attribute Groups', path: '/settings/attribute-Groups' },
            { title: 'Families', path: '/settings/families' },

            { heading: 'Automation' },
            { title: 'Rules', path: '/settings/Rules' },
            { title: 'Identifier Generator', path: '/settings/identifier-generator' },
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
                 {/* Catalog settings */}
                <Route path='/categories' element={ <AllProductsPage /> } />
                {/* <Route path='/channels' element={ <AllProductsPage /> } /> */}
                <Route path='/locales' element={ <AllProductsPage /> } />
                <Route path='/currencies' element={ <AllProductsPage /> } />

                {/* Catalog settings */}
                <Route path='/attribute-groups' element={ <AllProductsPage /> } />
                <Route path='/attributes' element={ <AllProductsPage /> } />
                <Route path='/families' element={ <AllProductsPage /> } />
                <Route path='/association-types' element={ <AllProductsPage /> } />
                <Route path='/group-types' element={ <AllProductsPage /> } />
                <Route path='/Groups' element={ <AllProductsPage /> } />

                {/* Automation */}
                <Route path='/rules' element={ <AllProductsPage /> } />
                <Route path='/identifier-generator' element={ <AllProductsPage /> } />
            </Route>
            <Route index element={<Navigate to='/settings/categories' />} />
        </Routes>
    )
}

export { SettingIndex } 
