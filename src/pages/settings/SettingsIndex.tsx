import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/providers/sidebar-provider';

import { AllProductsPage, DashboardPage } from '@/pages/store-admin';

import { ChannelsIndex } from './channels/Index';
import { CurrenciesIndex } from './currencies/Index';
import { LocalesIndex } from './locales/Index';
import { EditChannel } from './channels/components/EditChannel';

const SettingsIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            { heading: 'Catalog settings' },

            { title: 'Categories', path: '/settings/categories' },
            { title: 'Channels', path: '/settings/channels' },
            { title: 'Currencies', path: '/settings/currencies' },
            { title: 'Locales', path: '/settings/locales' },

            { heading: 'Product settings' },

            { title: 'Attributes', path: '/settings/attributes' },
            { title: 'Attribute groups', path: '/settings/attribute-groups' },
            { title: 'Family', path: '/settings/family' },
            { heading: 'Automation' },
            // { title: 'Categories', path: '/system/categories' },
            { title: 'Rules', path: '/settings/rules' },
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

                <Route path='/channels' element={<ChannelsIndex />} />
                <Route path='/channel/:id/edit' element={<EditChannel />} />

                <Route path='/currencies' element={<CurrenciesIndex />} />
                <Route path='/locales' element={ <LocalesIndex /> } />
                {/* Product settings */}
                <Route path='/attributes' element={ <AllProductsPage /> } />
                <Route path='/attribute-groups' element={ <AllProductsPage /> } />
                <Route path='/family' element={ <AllProductsPage /> } />
                {/* Automation */}
                <Route path='/rules' element={ <AllProductsPage /> } />
                <Route path='/identifier-generator' element={ <AllProductsPage /> } />
                
            </Route>
            <Route index element={<Navigate to='/categories' />} />
        </Routes>
    )
}

export { SettingsIndex } 
